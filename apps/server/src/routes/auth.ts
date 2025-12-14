import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { refresh, signup } from "../controllers/authController.js";

export function authRouter(): ExpressRouter {
  const r = Router();

  // MVP:
  // - email-only signup
  // - refresh token for new access token
  // Later:
  // - OAuth2 / password hash / email verification
  // - refresh token rotation + revocation stored in DB
  r.post("/signup", signup);
  r.post("/refresh", refresh);

  return r;
}


