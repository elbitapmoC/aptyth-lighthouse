// backend/middleware/authMiddleware.ts
import type { Next } from "../deps.ts";
import { verify } from "../deps.ts";
import { getSignedCookie } from "../deps.ts";
import type { CustomContext } from "../types/context.ts";
import { config } from "../utils/config.ts";

export const authMiddleware = async (c: CustomContext, next: Next) => {
  const secret = config.jwtSecret;

  // --- CORRECT KEY IMPORT ---
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["verify"]
  );

  const jwt = await getSignedCookie(c, "jwt", secret);

  if (!jwt) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    // Use the imported key, not the secret string
    const payload = await verify(jwt, key);
    c.set("user", payload);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
