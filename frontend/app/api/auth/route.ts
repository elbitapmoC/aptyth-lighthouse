import pool from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const SALT_ROUNDS = 12;

/**
 * Handles POST requests for user authentication.
 * @param {Request} request - The incoming HTTP request.
 * @returns {Promise<Response>} - The HTTP response.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if the user exists in the database
    const queryText = "SELECT id, email, password FROM users WHERE email = $1";
    const user = await pool.query(queryText, [email]);

    if (user.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const { id, password: hashedPassword } = user.rows[0];

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

/**
 * Handles PUT requests for user registration.
 * @param {Request} request - The incoming HTTP request.
 * @returns {Promise<Response>} - The HTTP response.
 */
export async function PUT(request: Request): Promise<Response> {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const checkUserQuery = "SELECT id FROM users WHERE email = $1";
    const existingUser = await pool.query(checkUserQuery, [email]);

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert the new user into the database
    const insertUserQuery =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";
    const newUser = await pool.query(insertUserQuery, [email, hashedPassword]);

    return NextResponse.json({ id: newUser.rows[0].id });
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
