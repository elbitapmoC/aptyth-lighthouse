// backend/middleware/rateLimit.ts
import type { Context, Next } from "../deps.ts";
import { logger } from "../utils/logger.ts";

const rateLimits = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(limit = 100, windowMs = 60000) {
  return async (c: Context, next: Next) => {
    const ip = c.req.header("x-forwarded-for") || "unknown";
    const now = Date.now();

    if (!rateLimits.has(ip)) {
      rateLimits.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      const data = rateLimits.get(ip);

      if (data && now > data.resetTime) {
        data.count = 1;
        data.resetTime = now + windowMs;
      } else if (data) {
        data.count++;
        if (data.count > limit) {
          logger.warn({ ip, requestCount: data.count }, "Rate limit exceeded");
          return c.json({ error: "Too many requests" }, 429);
        }
      }
    }

    await next();
  };
}
