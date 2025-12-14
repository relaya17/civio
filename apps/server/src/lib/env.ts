import { z } from "zod";

function requireProd(name: string, value: string | undefined) {
  if (process.env.NODE_ENV === "production" && (!value || value.trim().length === 0)) {
    throw new Error(`Missing required env var in production: ${name}`);
  }
}

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MONGODB_URI: z.string().url().optional(),
  JWT_ISSUER: z.string().default("civio"),
  JWT_AUDIENCE: z.string().default("civio.clients"),
  JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().min(60).default(15 * 60),
  JWT_REFRESH_TTL_SECONDS: z.coerce.number().int().min(60).default(30 * 24 * 60 * 60),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:5727")
    .transform((v) => v.split(",").map((s) => s.trim()).filter(Boolean)),
});

export const env = envSchema.parse({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_ISSUER: process.env.JWT_ISSUER,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE,
  JWT_ACCESS_TTL_SECONDS: process.env.JWT_ACCESS_TTL_SECONDS,
  JWT_REFRESH_TTL_SECONDS: process.env.JWT_REFRESH_TTL_SECONDS,
  JWT_SECRET:
    (requireProd("JWT_SECRET", process.env.JWT_SECRET), process.env.JWT_SECRET) ??
    "dev-only-secret-change-me-dev-only-secret-change-me",
  CORS_ORIGINS: (requireProd("CORS_ORIGINS", process.env.CORS_ORIGINS), process.env.CORS_ORIGINS),
});


