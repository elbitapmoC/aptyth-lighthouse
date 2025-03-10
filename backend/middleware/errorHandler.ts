import { Context } from "https://deno.land/x/oak/mod.ts";

/**
 * Error handler middleware for the Oak application.
 * This middleware catches errors thrown during request processing
 * and sends a structured error response to the client.
 */
export async function errorHandler(ctx: Context, next: () => Promise<unknown>) {
  try {
    // Proceed to the next middleware or route handler
    await next();
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error occurred:", err);

    // Set the response status and body based on the error
    ctx.response.status = err.status || 500;
    ctx.response.body = {
      error: true,
      message: err.message || "Internal Server Error",
    };

    // Optionally set additional headers for error responses
    ctx.response.headers.set("Content-Type", "application/json");
  }
}
