import type { ErrorRequestHandler, Request } from "express";
import { ZodError } from "zod";
import { logger } from "../lib/logger.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  void _next;
  const requestId = (req as Request & { requestId?: string }).requestId;

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "bad_request",
      requestId,
      details: err.flatten(),
    });
  }

  logger.error({ err, requestId }, "request error");
  return res.status(500).json({ error: "internal_error", requestId });
};


