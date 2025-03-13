// backend/api/user.ts
import { type Context, Hono } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import type { JWTPayload } from "../utils/auth.ts";

const app = new Hono();

app.get("/", authMiddleware, async (c: Context) => {
  const user = c.get("user") as JWTPayload | undefined;
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  return c.json({ message: `Welcome, ${user.sub}!`, user });
});

export default app;
