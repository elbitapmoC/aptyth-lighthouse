import { Context } from "https://deno.land/x/oak/mod.ts";

/**
 * Logger middleware for the Oak application.
 * Logs the HTTP method, URL, and response time for each request.
 */
export async function logger(ctx: Context, next: () => Promise<unknown>) {
  const start = performance.now();
  await next();
  const ms = performance.now() - start;
  console.log(
    `${ctx.request.method} ${ctx.request.url} - ${ms.toFixed(2)}ms`
  );
}
