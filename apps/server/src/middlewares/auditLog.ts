import type { Request, RequestHandler } from "express";
import { logger } from "../lib/logger.js";

/**
 * Minimal audit trail: who did what and when.
 * Later: persist to DB (Mongo) and/or append-only storage.
 */
export const auditLogMiddleware: RequestHandler = (req, _res, next) => {
  const requestId = (req as Request & { requestId?: string }).requestId;
  logger.info(
    {
      audit: true,
      requestId,
      method: req.method,
      path: req.path,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    },
    "audit",
  );
  next();
};


