import { createUser, getUserByEmail } from "../../db/queries.ts";
// backend/api/auth/mod.ts
import { Hono } from "../../deps.ts";
import { z } from "../../deps.ts";
import { compare, hash } from "../../deps.ts";
import { type Payload, sign } from "../../deps.ts"; // Use sign from djwt (via deps.ts)
import { deleteCookie, getSignedCookie, setSignedCookie } from "../../deps.ts";
import { UserSchema } from "../../models/user.ts";
import { config } from "../../utils/config.ts"; // Import config

const app = new Hono();

// --- User Registration ---
app.post("/register", async (c) => {
  const body = await c.req.json();
  const result = UserSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: result.error }, 400);
  }

  const { email, password } = result.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return c.json({ error: "User already exists" }, 409);
  }
  //Use bcryptjs
  const hashedPassword = await hash(password); // Use bcryptjs's hash function (no salt round needed)
  const newUser = await createUser(email, hashedPassword);

  if (!newUser) {
    return c.json({ error: "Failed to create user" }, 500);
  }

  return c.json(
    { message: "User registered successfully", user: { email: newUser.email } },
    201
  );
});

// --- User Login ---
app.post("/login", async (c) => {
  const body = await c.req.json();
  const result = UserSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: result.error }, 400);
  }

  const { email, password } = result.data;

  const user = await getUserByEmail(email);
  if (!user) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const passwordMatch = await compare(password, user.password); // Use bcryptjs's compare function
  if (!passwordMatch) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // Create JWT
  const payload: Payload = {
    iss: "lighthouse-platform", // Issuer (you can customize this)
    sub: user.id, // Subject (usually the user ID)
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expiration (1 hour from now)
  };

  const jwt = await sign(payload, config.jwtSecret); // Use djwt's sign function and config

  // Set cookie (using Hono's helper)
  await setSignedCookie(c, "jwt", jwt, config.jwtSecret, {
    path: "/",
    secure: true, // IMPORTANT: Use secure cookies in production
    httpOnly: true, // IMPORTANT: Prevent client-side JavaScript access
    maxAge: 60 * 60 * 24 * 7, // 1 week (adjust as needed)
    sameSite: "Strict", // IMPORTANT: Enhance security against CSRF attacks
  });

  return c.json({ message: "Login successful" });
});

// --- User Logout ---
app.get("/logout", async (c) => {
  deleteCookie(c, "jwt"); // Use Hono's deleteCookie helper
  return c.text("Logged out!");
});

export default app;
