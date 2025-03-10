import db from "../db/mod.ts";

/**
 * Represents a user in the system.
 */
export interface User {
  id: number;
  email: string;
  password: string;
}

/**
 * Fetches a user by their email.
 * @param email - The email of the user to fetch.
 * @returns The user object if found, otherwise null.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const queryText = "SELECT id, email, password FROM users WHERE email = $1";
  const result = await db.query(queryText, [email]);

  if (result.rows.length === 0) {
    return null;
  }

  const { id, password } = result.rows[0];
  return { id, email, password };
}

/**
 * Creates a new user in the database.
 * @param email - The email of the new user.
 * @param password - The hashed password of the new user.
 * @returns The newly created user object.
 */
export async function createUser(email: string, password: string): Promise<User> {
  const queryText =
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, password";
  const result = await db.query(queryText, [email, password]);

  const { id } = result.rows[0];
  return { id, email, password };
}

/**
 * Fetches a user by their ID.
 * @param id - The ID of the user to fetch.
 * @returns The user object if found, otherwise null.
 */
export async function getUserById(id: number): Promise<User | null> {
  const queryText = "SELECT id, email, password FROM users WHERE id = $1";
  const result = await db.query(queryText, [id]);

  if (result.rows.length === 0) {
    return null;
  }

  const { email, password } = result.rows[0];
  return { id, email, password };
}
