import { Hono } from "hono";
import { z } from "zod";
import { createUser, getUserByEmail } from "../db/queries.ts";
import { comparePassword, generateToken, hashPassword } from "../utils/auth.ts";
import { logger } from "../utils/logger.ts";

type Variables = {
  userId: string;
};

const auth = new Hono<{ Variables: Variables }>();

// User registration
auth.post("/register", async (c) => {
  try {
    // Validate request body
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().min(2),
    });

    const body = await c.req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return c.json({ error: "Invalid input data" }, 400);
    }

    const { email, password, name } = result.data;

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return c.json({ error: "User already exists" }, 409);
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = await createUser(email, hashedPassword, name);

    // Generate JWT token
    const token = generateToken({ userId: user.id });

    logger.info(`User registered: ${email}`);

    // Return user data (excluding password) and token
    return c.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      },
      201
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Registration error: ${error.message}`);
    } else {
      logger.error("Registration error: Unknown error occurred");
    }
    return c.json({ error: "Registration failed" }, 500);
  }
});

// User login
auth.post("/login", async (c) => {
  try {
    // Validate request body
    const schema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const body = await c.req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return c.json({ error: "Invalid input data" }, 400);
    }

    const { email, password } = result.data;

    // Find user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Generate JWT token
    const token = generateToken({ userId: user.id });

    logger.info(`User logged in: ${email}`);

    // Return user data (excluding password) and token
    return c.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Login error: ${error.message}`);
    } else {
      logger.error("Login error: Unknown error occurred");
    }
    return c.json({ error: "Login failed" }, 500);
  }
});

// Logout (optional - can be handled client-side by removing the token)
auth.post("/logout", (c) => {
  return c.json({ message: "Logged out successfully" });
});

export default auth;
