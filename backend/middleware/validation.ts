import { z } from "https://deno.land/x/zod/mod.ts";
import { Context, Middleware } from "https://deno.land/x/oak/mod.ts";

/**
 * Validation middleware using Zod to validate request data.
 * This middleware ensures that incoming request data adheres to the specified schema,
 * improving data integrity and security.
 *
 * @param schema - The Zod schema to validate the request body against.
 * @returns Middleware function for validation.
 */
export function validate(schema: z.ZodTypeAny): Middleware {
  return async (ctx: Context, next: () => Promise<unknown>) => {
    try {
      // Parse and validate the request body
      const body = await ctx.request.body({ type: "json" }).value;
      ctx.state.validatedData = schema.parse(body);

      // Proceed to the next middleware or route handler
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Respond with validation errors
        ctx.response.status = 400;
        ctx.response.body = {
          error: "Validation failed",
          details: error.errors,
        };
      } else {
        // Handle other errors
        console.error("Validation middleware error:", error);
        ctx.response.status = 500;
        ctx.response.body = { error: "Internal server error" };
      }
    }
  };
}
