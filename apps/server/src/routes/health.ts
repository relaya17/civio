import { Router } from "express";
import type { Express } from "express";
import { isMongoConnected } from "../lib/mongo.js";

export function healthRouter(): Express {
  const r = Router();

  r.get("/", (_req, res) => {
    res.json({
      ok: true,
      mongo: isMongoConnected() ? "connected" : "disconnected",
    });
  });

  return r as unknown as Express;
}

