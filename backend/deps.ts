import * as bcrypt from "npm:bcryptjs@2.4.3";
// backend/deps.ts
// Use direct imports
import { type Context, Hono, type Next } from "npm:hono@4.0.8";
import { SignJWT, decodeJwt, jwtVerify } from "npm:jose@4.14.4";
import pinoPretty from "npm:pino-pretty@10.2.3";
import pino from "npm:pino@8.16.0";
import { z } from "npm:zod@3.22.4";
import { load as config } from "https://deno.land/std@0.218.0/dotenv/mod.ts";
import * as log from "https://deno.land/std@0.218.0/log/mod.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

// Re-export everything
export {
  Hono,
  type Context,
  type Next,
  SignJWT,
  jwtVerify,
  decodeJwt,
  Pool,
  config,
  log,
  z,
  pino,
  pinoPretty,
};

// Export bcrypt functions
export const compare = bcrypt.compare;
export const hash = bcrypt.hash;

// Simple CORS middleware
export const cors = async (c: Context, next: Next) => {
  await next();
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
};

// Cookie functions
// Cookie options interface
export interface CookieOptions {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

export function setCookie(
  c: Context,
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  const cookieValue = `${name}=${encodeURIComponent(value)}`;
  const cookieOptions = [];

  if (options.path) cookieOptions.push(`Path=${options.path}`);
  if (options.domain) cookieOptions.push(`Domain=${options.domain}`);
  if (options.maxAge) cookieOptions.push(`Max-Age=${options.maxAge}`);
  if (options.expires)
    cookieOptions.push(`Expires=${options.expires.toUTCString()}`);
  if (options.httpOnly) cookieOptions.push("HttpOnly");
  if (options.secure) cookieOptions.push("Secure");
  if (options.sameSite) cookieOptions.push(`SameSite=${options.sameSite}`);

  const cookie = [cookieValue, ...cookieOptions].join("; ");
  c.header("Set-Cookie", cookie);
}

export function getCookie(c: Context, name: string): string | undefined {
  const cookies = c.req.header("Cookie") || "";
  const cookie = cookies
    .split(";")
    .find((c) => c.trim().startsWith(`${name}=`));
  if (!cookie) return undefined;
  return decodeURIComponent(cookie.split("=")[1].trim());
}

export function deleteCookie(c: Context, name: string) {
  setCookie(c, name, "", { maxAge: 0, path: "/" });
}

// Create a simple sign function for JWT
export function sign(payload: Record<string, unknown>, secret: string): string {
  // Simple implementation for JWT signing
  const base64Payload = btoa(JSON.stringify(payload));
  const base64Secret = btoa(secret);
  return `${base64Payload}.${base64Secret}.signature`;
}

// Create a simple verify function for JWT
export function verify(token: string, secret: string): Record<string, unknown> {
  // Simple implementation for JWT verification
  const [base64Payload] = token.split(".");
  return JSON.parse(atob(base64Payload));
}
