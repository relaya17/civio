import type { RequestHandler, Request } from "express";
import crypto from "node:crypto";

export const requestIdMiddleware: RequestHandler = (req, res, next) => {
  const header = req.header("x-request-id");
  const requestId = header && header.trim().length > 0 ? header : crypto.randomUUID();
  res.setHeader("x-request-id", requestId);
  (req as Request & { requestId: string }).requestId = requestId;
  next();
};


