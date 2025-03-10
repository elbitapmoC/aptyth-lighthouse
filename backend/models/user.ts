import db from "../db/mod.ts";

/**
 * Represents a user in the system.
 */
interface User {
  id: number;
  email: string;
  password: string;
}

/**
 * Fetches a user by their email.
 * @param email - The email of the user to fetch.
 * @returns A promise resolving to the user object or null if not found.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const queryText = `
    SELECT id, email, password
    FROM users
    WHERE email = $1
  `;
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
 * @returns A promise resolving to the ID of the newly created user.
 */
export async function createUser(email: string, password: string): Promise<number> {
  const queryText = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id
  `;
  const result = await db.query(queryText, [email, password]);

  return result.rows[0].id;
}

/**
 * Deletes a user by their ID.
 * @param id - The ID of the user to delete.
 * @returns A promise resolving to the number of rows deleted.
 */
export async function deleteUserById(id: number): Promise<number> {
  const queryText = `
    DELETE FROM users
    WHERE id = $1
  `;
  const result = await db.query(queryText, [id]);

  return result.rowCount;
}

/**
 * Updates a user's password.
 * @param id - The ID of the user to update.
 * @param newPassword - The new hashed password.
 * @returns A promise resolving to the number of rows updated.
 */
export async function updateUserPassword(id: number, newPassword: string): Promise<number> {
  const queryText = `
    UPDATE users
    SET password = $1
    WHERE id = $2
  `;
  const result = await db.query(queryText, [newPassword, id]);

  return result.rowCount;
}
