// backend/api/auth/mod.ts
import { createUser, getUserByEmail } from "../../db/queries.ts";
import { Hono } from "../../deps.ts";
import { compare, hash } from "../../deps.ts";
import { sign } from "../../deps.ts";
import { deleteCookie, setCookie } from "../../deps.ts"; //Keep used
import { UserSchema } from "../../models/user.ts";
import type { JWTPayload } from "../../utils/auth.ts";
import { getConfig } from "../../utils/config.ts";
import { error, success } from "../../utils/response.ts";

const app = new Hono();

// --- User Registration ---
app.post("/register", async (c) => {
  const body = await c.req.json();
  const result = UserSchema.safeParse(body);

  if (!result.success) {
    return error(c, "Validation Error", result.error, 400);
  }

  const { email, password } = result.data;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return error(c, "User already exists", undefined, 409);
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await createUser(email, hashedPassword);
    return success(
      c,
      "User registered successfully",
      { email: newUser.email },
      201
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return error(c, errorMessage, err, 500);
  }
});

// --- User Login ---
app.post("/login", async (c) => {
  const body = await c.req.json();
  const result = UserSchema.safeParse(body);

  if (!result.success) {
    return error(c, "Validation Error", result.error, 400);
  }

  const { email, password } = result.data;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return error(c, "Invalid credentials", undefined, 401);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return error(c, "Invalid credentials", undefined, 401);
    }

    // Create JWT
    const payload: JWTPayload = {
      iss: "lighthouse-platform",
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    };
    const config = await getConfig();
    const secret = config.jwtSecret;

    const jwt = await sign(payload, secret);

    // Set cookie with JWT
    setCookie(c, "jwt", jwt, {
      path: "/",
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "Strict",
    });

    return success(c, "Login successful");
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return error(c, errorMessage, undefined, 500);
  }
});

app.get("/logout", async (c) => {
  deleteCookie(c, "jwt");
  return success(c, "Logged out!");
});

export default app;
