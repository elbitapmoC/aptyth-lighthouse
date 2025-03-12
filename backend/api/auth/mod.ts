import { createUser, getUserByEmail } from "../../db/queries.ts";
// backend/api/auth/mod.ts
import { Hono } from "../../deps.ts";
import { compare, hash } from "../../deps.ts";
import { type Payload, sign } from "../../deps.ts"; // Keep only the used imports from djwt
import { deleteCookie, setSignedCookie } from "../../deps.ts"; //Keep used
import { UserSchema } from "../../models/user.ts";
import { config } from "../../utils/config.ts";
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

    const hashedPassword = await hash(password);
    const newUser = await createUser(email, hashedPassword);
    return success(
      c,
      "User registered successfully",
      { email: newUser.email },
      201
    );
  } catch (err: any) {
    return error(c, err.message, err, 500);
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

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return error(c, "Invalid credentials", undefined, 401);
    }

    // Create JWT
    const payload: Payload = {
      iss: "lighthouse-platform",
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    };
    const secret = config.jwtSecret;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign"]
    );

    const jwt = await sign(payload, key);

    // Set cookie
    await setSignedCookie(c, "jwt", jwt, secret, {
      path: "/",
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "Strict",
    });

    return success(c, "Login successful");
  } catch (err: any) {
    return error(c, err.message, undefined, 500);
  }
});

app.get("/logout", async (c) => {
  deleteCookie(c, "jwt");
  return success(c, "Logged out!");
});

export default app;
