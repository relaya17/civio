import { Router } from "express";
import type { Router as ExpressRouter } from "express";

export function healthRouter(): ExpressRouter {
  const r = Router();

  r.get("/", (_req, res) => {
    res.json({ ok: true });
  });

  return r;
}


