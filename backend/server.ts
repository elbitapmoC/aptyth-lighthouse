// backend/server.ts
import { Hono } from "./deps.ts";
import { cors } from "./deps.ts";
import { verify } from "./deps.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import { loggingMiddleware } from "./middleware/loggingMiddleware.ts";
import { rateLimit } from "./middleware/rateLimit.ts";
import { logger, setupLogger } from "./utils/logger.ts";
import { handleConnection } from "./websockets/handlers.ts";

// Import routes
import authRoutes from "./api/auth/mod.ts";
import bibleRoutes from "./api/bible/mod.ts";
import profileRoute from "./api/user.ts";

// Setup logger
await setupLogger();

// Check if running on Deno Deploy
const isDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;
if (isDeploy) {
  logger.info("Running on Deno Deploy");
}

const app = new Hono();

// --- Middleware ---
app.use("*", loggingMiddleware);
app.use("*", cors());
app.use("/api/*", rateLimit(100, 60000)); // Apply rate limiting to all API routes
app.onError(errorHandler);

// --- Routes ---
app.route("/api/auth", authRoutes);
app.route("/api/bible", bibleRoutes);
app.route("/api/profile", profileRoute);

// Health check endpoint
app.get("/health", (c) =>
  c.json({ status: "ok", timestamp: new Date().toISOString() })
);

// --- WebSocket Route ---
app.get("/ws", async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader; // Get token from Authorization header

  try {
    // Generate secret key for JWT verification
    const secretKey = await crypto.subtle.generateKey(
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"]
    );

    // Verify the token
    const payload = await verify(token, secretKey);
    const userId = payload.sub; // Get user ID from the 'sub' claim

    if (!userId) {
      return c.json({ error: "Invalid token payload" }, 401);
    }

    // Upgrade the connection to WebSocket
    const { socket, response } = Deno.upgradeWebSocket(c.req.raw);

    // Handle the WebSocket connection
    handleConnection(socket, userId as string);

    return response;
  } catch (error) {
    logger.error({ error }, "WebSocket authentication failed");
    return c.json({ error: "Invalid authentication token" }, 401);
  }
});

// Get port from environment or use default
const port = Number.parseInt(Deno.env.get("PORT") || "8000");

// Start the server
Deno.serve(
  {
    port,
    hostname: isDeploy ? undefined : "0.0.0.0",
  },
  app.fetch
);

logger.info({ port }, "Server is running");
