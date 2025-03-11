// backend/api/user.ts
import { Hono } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const app = new Hono();

app.get("/", authMiddleware, async (c) => {
  const user = c.get("user");
  return c.json({ message: `Welcome, ${user.sub}!` }); // Access user info from context
});

export default app;
