import { Context, Middleware } from "https://deno.land/x/oak/mod.ts";

/**
 * CORS middleware to allow requests from the Next.js frontend.
 * This middleware sets the appropriate headers to handle CORS.
 */
const corsMiddleware: Middleware = async (ctx: Context, next: () => Promise<unknown>) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204; // No Content
    return;
  }

  await next();
};

export { corsMiddleware };
