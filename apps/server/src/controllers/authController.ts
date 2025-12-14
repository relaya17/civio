import type { RequestHandler } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import { signAccessToken, signRefreshToken, verifyToken } from "../services/jwt.js";

// MVP in-memory store (dev-only). Replace with Mongo + hashed refresh tokens.
const users = new Map<string, { id: string; email: string }>();
const sessions = new Map<string, { sessionId: string; userId: string }>();

const signupSchema = z.object({
  email: z.string().email(),
});

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const body = signupSchema.parse(req.body);
    const existing = [...users.values()].find((u) => u.email === body.email);
    const userId = existing?.id ?? crypto.randomUUID();
    users.set(userId, { id: userId, email: body.email });

    const sessionId = crypto.randomUUID();
    sessions.set(sessionId, { sessionId, userId });

    const accessToken = await signAccessToken({ userId });
    const refreshToken = await signRefreshToken({ userId, sessionId });
    return res.status(201).json({ userId, accessToken, refreshToken });
  } catch (err) {
    return next(err);
  }
};

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const body = refreshSchema.parse(req.body);
    const verified = await verifyToken(body.refreshToken);
    const payload = verified.payload as unknown;
    if (!payload || typeof payload !== "object") return res.status(401).json({ error: "invalid_token" });
    const typ = (payload as { typ?: unknown }).typ;
    const sid = (payload as { sid?: unknown }).sid;
    const sub = verified.payload.sub;
    if (typ !== "refresh" || typeof sid !== "string" || typeof sub !== "string") {
      return res.status(401).json({ error: "invalid_token" });
    }
    const session = sessions.get(sid);
    if (!session || session.userId !== sub) return res.status(401).json({ error: "invalid_session" });

    const accessToken = await signAccessToken({ userId: sub });
    return res.json({ accessToken });
  } catch (err) {
    return next(err);
  }
};


