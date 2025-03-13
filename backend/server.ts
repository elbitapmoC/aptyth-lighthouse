import { checkDatabaseHealth } from "./db/client.ts";
// backend/server.ts
import { type Context, Hono, cors } from "./deps.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import { loggingMiddleware } from "./middleware/loggingMiddleware.ts";
import { rateLimit } from "./middleware/rateLimit.ts";
import { verifyJwt } from "./utils/auth.ts";
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
app.use("*", cors);
app.use("/api/*", rateLimit(100, 60000)); // Apply rate limiting to all API routes
app.onError(errorHandler);

// --- Routes ---
app.route("/api/auth", authRoutes);
app.route("/api/bible", bibleRoutes);
app.route("/api/profile", profileRoute);

// Health check endpoints
app.get("/health", (c: Context) =>
  c.json({ status: "ok", timestamp: new Date().toISOString() })
);

// Detailed health check with database status
app.get("/health/detailed", async (c: Context) => {
  const dbHealth = await checkDatabaseHealth();

  return c.json({
    status: dbHealth ? "ok" : "degraded",
    services: {
      api: "ok",
      database: dbHealth ? "ok" : "error",
    },
    timestamp: new Date().toISOString(),
  });
});

// --- WebSocket Route ---
app.get("/ws", async (c: Context) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1]; // Get token from Authorization header

  try {
    // Use our verifyJwt function for consistent authentication
    const payload = await verifyJwt(token);
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

Deno.serve(
  {
    port,
    hostname: isDeploy ? undefined : "0.0.0.0",
  },
  app.fetch
);

logger.info({ port }, "Server is running");
