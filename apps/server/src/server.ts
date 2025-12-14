import express from "express";
import type { Express, RequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pinoHttpImport from "pino-http";
import { logger } from "./lib/logger.js";
import { requestIdMiddleware } from "./middlewares/requestId.js";
import { auditLogMiddleware } from "./middlewares/auditLog.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { healthRouter } from "./routes/health.js";
import { authRouter } from "./routes/auth.js";
import { lawyersRouter } from "./routes/lawyers.js";
import { env } from "./lib/env.js";

type PinoHttpFactory = (opts: { logger: typeof logger }) => RequestHandler;
const pinoHttp = pinoHttpImport as unknown as PinoHttpFactory;

export function createServer(): Express {
  const app = express();

  app.disable("x-powered-by");
  app.use(pinoHttp({ logger }));
  app.use(requestIdMiddleware);
  app.use(auditLogMiddleware);

  app.use(
    helmet({
      contentSecurityPolicy: false, // API-only, keep simple for now
    }),
  );

  app.use(
    cors({
      origin: env.CORS_ORIGINS,
      credentials: true,
    }),
  );

  app.use(express.json({ limit: "256kb" }));

  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.use("/api/health", healthRouter());
  app.use("/api/auth", authRouter());
  app.use("/api/lawyers", lawyersRouter());

  app.use(errorHandler);
  return app;
}


