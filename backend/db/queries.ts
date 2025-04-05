import { eq } from "drizzle-orm";
import { logger } from "../utils/logger.ts";
import { db } from "./client.ts";
// backend/db/queries.ts
import { users } from "./schema/user.ts";

/**
 * Creates a new user in the database
 * @param email - The user's email
 * @param passwordHash - The hashed password
 * @param name - The user's name
 * @returns The created user
 * @throws Error if there's a database error
 */
export async function createUser(
  email: string,
  passwordHash: string,
  name: string
) {
  try {
    const [user] = await db
      .insert(users)
      .values({ email, password: passwordHash, name })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });
    return user;
  } catch (error) {
    logger.error({ error }, "Database error in createUser");
    throw new Error(`Failed to create user: ${error}`);
  }
}

/**
 * Gets a user by email
 * @param email - The email to look up
 * @returns The user or null if not found
 * @throws Error if there's a database error
 */
export async function getUserByEmail(email: string) {
  try {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.email, email));
    return user ?? null;
  } catch (error) {
    logger.error({ error }, "Database error in getUserByEmail");
    throw new Error(`Failed to get user by email: ${error}`);
  }
}
