import { Router } from "oak";
import { compare } from "bcrypt";
import { create, verify } from "djwt";
import db from "postgres";

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "your_jwt_secret_key";
const SALT_ROUNDS = 12;

const router = new Router();

/**
 * Handles user authentication.
 */
router.post("/login", async (ctx) => {
  try {
    const { email, password } = await ctx.request.body({ type: "json" }).value;

    if (!email || !password) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Email and password are required." };
      return;
    }

    // Check if the user exists in the database
    const queryText = "SELECT id, email, password FROM users WHERE email = $1";
    const result = await db.query(queryText, [email]);

    if (result.rows.length === 0) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid email or password." };
      return;
    }

    const { id, password: hashedPassword } = result.rows[0];

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await compare(password, hashedPassword);

    if (!isPasswordValid) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid email or password." };
      return;
    }

    // Generate a JWT token
    const payload = { id, email };
    const token = await create({ alg: "HS256", typ: "JWT" }, payload, JWT_SECRET);

    ctx.response.body = { token };
  } catch (error) {
    console.error("Error during authentication:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error." };
  }
});

/**
 * Handles user registration.
 */
router.put("/register", async (ctx) => {
  try {
    const { email, password } = await ctx.request.body({ type: "json" }).value;

    if (!email || !password) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Email and password are required." };
      return;
    }

    // Check if the user already exists
    const checkUserQuery = "SELECT id FROM users WHERE email = $1";
    const existingUser = await db.query(checkUserQuery, [email]);

    if (existingUser.rows.length > 0) {
      ctx.response.status = 409;
      ctx.response.body = { error: "User already exists." };
      return;
    }

    // Hash the password
    const hashedPassword = await hash(password, SALT_ROUNDS);

    // Insert the new user into the database
    const insertUserQuery =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";
    const newUser = await db.query(insertUserQuery, [email, hashedPassword]);

    ctx.response.body = { id: newUser.rows[0].id };
  } catch (error) {
    console.error("Error during user registration:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error." };
  }
});

export default router;