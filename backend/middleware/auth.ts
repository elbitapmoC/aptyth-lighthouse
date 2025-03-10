import type { Middleware, Context } from "oak";

/**
 * Middleware to handle authentication.
 * This middleware checks for the presence of a valid JWT token in the Authorization header.
 */
const authMiddleware: Middleware = async (ctx: Context, next) => {
  const authorization = ctx.request.headers.get("Authorization");

  if (!authorization) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Authorization header is missing." };
    return;
  }

  const token = authorization.replace("Bearer ", "");

  try {
    // Verify the JWT token
    const payload = await ctx.state.jwt.verify(token);

    // Attach the payload to the context state for downstream handlers
    ctx.state.user = payload;

    await next();
  } catch (error) {
    console.error("Authentication error:", error);
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid or expired token." };
  }
};

export default authMiddleware;
