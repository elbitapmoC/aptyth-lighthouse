import {
  deleteCookie,
  getSignedCookie,
  setSignedCookie,
} from "hono/helper/cookie"; // Corrected import
import { sign } from "hono/jwt";
import { createUser, getUserByEmail } from "../db/queries.ts";
// backend/api/auth.ts
import { Hono } from "../deps.ts";
import { z } from "../deps.ts";
import { compare, hash } from "../deps.ts";
import { type Payload, create } from "../deps.ts";
import { UserSchema } from "../models/user.ts"; // Import from models

const app = new Hono();

// --- SECRET KEY (Store this securely in environment variables!) ---
// const secretKey = await crypto.subtle.generateKey(
//   { name: "HMAC", hash: "SHA-512" },
//   true,
//   ["sign", "verify"],
// );

// const Key = await crypto.subtle.exportKey("jwk", secretKey);

const secret = Deno.env.get("JWT_SECRET")!; // Load from .env

// --- User Registration ---
app.post("/register", async (c) => {
  const body = await c.req.json();
  const result = UserSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: result.error }, 400);
  }

  const { email, password } = result.data;
  console.log(email, password);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return c.json({ error: "User already exists" }, 409);
  }

  const hashedPassword = await hash(password, 10);
  const newUser = await createUser(email, hashedPassword);

  if (!newUser) {
    return c.json({ error: "Failed to create user" }, 500);
  }

  return c.json(
    { message: "User registered successfully", user: { email: newUser.email } },
    201
  ); // Return user data
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

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // Create JWT
  const payload: Payload = {
    iss: "lighthouse-platform",
    sub: user.id, // Use user ID
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
  };

  const secretKey = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"]
  );

  const jwt = await create({ alg: "HS512", typ: "JWT" }, payload, secretKey); // Use secretKey

  // Set cookie.
  await setSignedCookie(c, "jwt", jwt, secret, {
    path: "/",
    secure: true, //process.env.NODE_ENV === 'production', // Must be true in production
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "Strict", // Important for security
  });

  return c.json({ message: "Login successful" });
});

app.get("/logout", async (c) => {
  deleteCookie(c, "jwt");
  return c.text("Logged out!");
});

export default app;
