import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from "./routes/mod.ts";
import { logger } from "./middleware/logger.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

// Create a new Oak application
const app = new Application();

// Middleware to handle CORS
app.use(
  oakCors({
    origin: "http://localhost:3000", // Allow requests from the Next.js frontend
    optionsSuccessStatus: 200,
  })
);

// Middleware to log requests
app.use(logger);

// Middleware to handle errors
app.use(errorHandler);

// Use the router for handling routes
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const PORT = Deno.env.get("PORT") || 8000;
console.log(`Server is running on http://localhost:${PORT}`);
await app.listen({ port: +PORT });
