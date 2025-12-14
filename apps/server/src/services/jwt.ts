import { SignJWT, jwtVerify } from "jose";
import { env } from "../lib/env.js";

function getKey() {
  return new TextEncoder().encode(env.JWT_SECRET);
}

export interface AccessTokenClaims {
  readonly sub: string;
  readonly typ: "access";
}

export interface RefreshTokenClaims {
  readonly sub: string;
  readonly typ: "refresh";
  readonly sid: string; // session id
}

export async function signAccessToken(params: { userId: string }) {
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT({ typ: "access" satisfies AccessTokenClaims["typ"] })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(params.userId)
    .setIssuer(env.JWT_ISSUER)
    .setAudience(env.JWT_AUDIENCE)
    .setIssuedAt(now)
    .setExpirationTime(now + env.JWT_ACCESS_TTL_SECONDS)
    .sign(getKey());
}

export async function signRefreshToken(params: { userId: string; sessionId: string }) {
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT({
    typ: "refresh" satisfies RefreshTokenClaims["typ"],
    sid: params.sessionId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(params.userId)
    .setIssuer(env.JWT_ISSUER)
    .setAudience(env.JWT_AUDIENCE)
    .setIssuedAt(now)
    .setExpirationTime(now + env.JWT_REFRESH_TTL_SECONDS)
    .sign(getKey());
}

export async function verifyToken(token: string) {
  return await jwtVerify(token, getKey(), {
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
  });
}


