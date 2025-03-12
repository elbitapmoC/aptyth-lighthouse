import authRoutes from "./api/auth/mod.ts";
import bibleRoutes from "./api/bible/mod.ts";
import profileRoute from "./api/user.ts";
// backend/server.ts
import { Hono } from "./deps.ts";
import { cors } from "./deps.ts";
import { verify } from "./deps.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import { loggingMiddleware } from "./middleware/loggingMiddleware.ts";
import { logger, setupLogger } from "./utils/logger.ts";
import { handleConnection } from "./websockets/handlers.ts";

// Setup logger
await setupLogger();

const app = new Hono();

// --- Middleware ---
app.use("*", loggingMiddleware);
app.use("*", cors());
app.onError(errorHandler);

// --- Routes ---
app.route("/api/auth", authRoutes);
app.route("/api/bible", bibleRoutes);
app.route("/api/profile", profileRoute);

// --- WebSocket Route ---
app.get("/ws", async (c) => {
  const authHeader = c.req.header("Authorization"); // Or however you pass the token
  if (!authHeader) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const token = authHeader; //.split(' ')[1];

  try {
    //  const payload = await verifyJwt(token); // Your custom JWT verification
    const secretKey = await crypto.subtle.generateKey(
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"]
    );
    const payload = await verify(token, secretKey);
    const userId = payload.sub; // Assuming you store user ID in 'sub'

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { socket, response } = Deno.upgradeWebSocket(c.req.raw);
    handleConnection(socket, userId as string); // Pass userId
    return response;
  } catch (error) {
    console.log(error);
    return c.json({ error: "Invalid token" }, 401);
  }
});

Deno.serve(app.fetch); // Use Deno.serve directly
logger.info("Server is running");
