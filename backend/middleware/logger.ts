import type { Context, Middleware } from "oak";

/**
 * Middleware to log HTTP requests in the Deno backend.
 * Logs the method, URL, and response time for each request.
 */
const logger: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>
) => {
  const start = performance.now(); // Record the start time
  await next(); // Proceed to the next middleware or route handler
  const ms = performance.now() - start; // Calculate the response time

  // Log the HTTP method, URL, and response time
  console.info(`${ctx.request.method} ${ctx.request.url} - ${ms.toFixed(2)}ms`);
};

export { logger };
