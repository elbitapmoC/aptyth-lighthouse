// Create backend/middleware/auth.ts
import type { Context, Next } from "../deps.ts";
import { verifyJwt } from "../utils/jwt.ts";
import { logger } from "../utils/logger.ts";

export async function authMiddleware(c: Context, next: Next) {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyJwt(token);
    c.set("user", payload);
    await next();
  } catch (error) {
    logger.error({ error }, "Authentication error");
    return c.json({ error: "Unauthorized" }, 401);
  }
}
