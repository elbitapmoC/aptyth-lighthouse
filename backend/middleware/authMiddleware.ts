import { getSignedCookie } from "hono/helper/cookie";
// backend/middleware/authMiddleware.ts
import type { Context, Next } from "../deps.ts";
import { verify } from "../deps.ts";

export const authMiddleware = async (c: Context, next: Next) => {
  // Get the secret key.
  const secret = Deno.env.get("JWT_SECRET")!;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const jwt = await getSignedCookie(c, "jwt", secret);

  if (!jwt) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const payload = await verify(jwt, secret); //hono jwt
    c.set("user", payload); // Attach user info to context.  Use c.set
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
