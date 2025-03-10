import type { Context, Middleware } from "oak";

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

/**
 * Middleware to handle errors in the Deno backend.
 * This middleware catches any errors thrown during request processing,
 * logs the error, and sends an appropriate response to the client.
 */
const errorHandler: Middleware = async (ctx: Context, next: () => Promise<unknown>) => {
  try {
    await next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error occurred:", err);

    // Set the response status and body based on the error type
    ctx.response.status = err.status || 500;
    ctx.response.body = {
      error: err.message || "Internal Server Error",
    };

    // Optionally, add more details in development mode
    if (Deno.env.get("ENV") === "development") {
      ctx.response.body.details = err.stack;
    }
  }
};

export { errorHandler };