// backend/api/user.ts
import { Hono } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import type { CustomContext, Payload } from "../types/context.ts"; // Import

const app = new Hono<{ Bindings: { user: Payload } }>();

app.get("/", authMiddleware, async (c: CustomContext) => {
  // Use CustomContext
  const user = c.get("user"); // Now TypeScript knows the type of 'user'
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  return c.json({ message: `Welcome, ${user.sub}!`, user });
});

export default app;
