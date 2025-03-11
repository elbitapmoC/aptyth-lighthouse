// backend/middleware/loggingMiddleware.ts
import type { Context, Next } from "../deps.ts";
import { logger } from "../utils/logger.ts";

export const loggingMiddleware = async (c: Context, next: Next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  const user = c.get("user");
  const userId = user ? user.sub : "anonymous";

  logger.info(
    `${c.req.method} ${c.req.url} - ${c.res.status} - ${ms}ms - User: ${userId}`
  );
};
