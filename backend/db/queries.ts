// backend/db/queries.ts
import type { User } from "../models/user.ts";
import { UserSchema } from "../models/user.ts";
import { type Verse, VerseSchema } from "../models/verse.ts";
import { logger } from "../utils/logger.ts";
import { pool } from "./client.ts";
import { db } from "./client.ts";
import { DatabaseError } from "./errors.ts";

/**
 * Database error types for more specific error handling
 */
export enum DatabaseErrorType {
  CONNECTION_ERROR = "CONNECTION_ERROR",
  QUERY_ERROR = "QUERY_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND",
}

/**
 * Creates a new user in the database
 * @param email - The user's email
 * @param passwordHash - The hashed password
 * @param name - The user's name
 * @returns The created user
 * @throws DatabaseError if there's a database error
 */
export async function createUser(
  email: string,
  passwordHash: string,
  name: string
): Promise<User> {
  const dbPool = await pool();
  const client = await dbPool.connect();

  try {
    const result = await client.queryObject(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, password_hash AS password, created_at AS "createdAt", updated_at AS "updatedAt"',
      [email, passwordHash, name]
    );

    if (result.rows.length === 0) {
      throw new DatabaseError(
        "Failed to create user: No rows returned",
        DatabaseErrorType.QUERY_ERROR
      );
    }

    // Validate the database response
    const userResult = UserSchema.safeParse(result.rows[0]);
    if (!userResult.success) {
      logger.error(
        { error: userResult.error },
        "createUser: Database record failed validation"
      );
      throw new DatabaseError(
        `Database record failed validation: ${userResult.error.message}`,
        DatabaseErrorType.VALIDATION_ERROR
      );
    }

    return userResult.data;
  } catch (error) {
    // Handle specific database errors
    if (error instanceof DatabaseError) {
      throw error;
    }

    // Handle other errors
    logger.error({ error }, "Database error in createUser");
    throw new DatabaseError(
      `Failed to create user: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      DatabaseErrorType.QUERY_ERROR,
      error
    );
  } finally {
    client.release();
  }
}

/**
 * Gets a user by email
 * @param email - The email to look up
 * @returns The user or null if not found
 * @throws DatabaseError if there's a database error
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const dbPool = await pool();
  const client = await dbPool.connect();

  try {
    const result = await client.queryObject(
      'SELECT id, email, password_hash AS password, created_at AS "createdAt", updated_at AS "updatedAt" FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    // Validate the database response
    const userResult = UserSchema.safeParse(result.rows[0]);
    if (!userResult.success) {
      logger.error(
        { error: userResult.error },
        "getUserByEmail: Database record failed validation"
      );
      throw new DatabaseError(
        `Database record failed validation: ${userResult.error.message}`,
        DatabaseErrorType.VALIDATION_ERROR
      );
    }

    return userResult.data;
  } catch (error) {
    // Handle specific database errors
    if (error instanceof DatabaseError) {
      throw error;
    }

    // Handle other errors
    logger.error({ error }, "Database error in getUserByEmail");
    throw new DatabaseError(
      `Failed to get user by email: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      DatabaseErrorType.QUERY_ERROR,
      error
    );
  } finally {
    client.release();
  }
}

/**
 * Gets a verse from the database
 * @param version - The Bible version
 * @param book - The book name
 * @param chapter - The chapter number
 * @param verse - The verse number
 * @returns The verse or null if not found
 * @throws DatabaseError if there's a database error
 */
export async function getVerse(
  version: string,
  book: string,
  chapter: number,
  verse: number
): Promise<Verse | null> {
  const dbPool = await pool();
  const client = await dbPool.connect();

  try {
    const result = await client.queryObject(
      `SELECT book, chapter, verse, text, version FROM verses
       WHERE version = $1 AND book = $2 AND chapter = $3 AND verse = $4`,
      [version, book, chapter, verse]
    );

    if (result.rows.length === 0) {
      return null;
    }

    // Validate the database response
    const verseResult = VerseSchema.safeParse(result.rows[0]);
    if (!verseResult.success) {
      logger.error(
        { error: verseResult.error },
        "getVerse: Database record failed validation"
      );
      throw new DatabaseError(
        `Database record failed validation: ${verseResult.error.message}`,
        DatabaseErrorType.VALIDATION_ERROR
      );
    }

    return verseResult.data;
  } catch (error) {
    // Handle specific database errors
    if (error instanceof DatabaseError) {
      throw error;
    }

    // Handle other errors
    logger.error({ error }, "Database error in getVerse");
    throw new DatabaseError(
      `Failed to get verse: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      DatabaseErrorType.QUERY_ERROR,
      error
    );
  } finally {
    client.release();
  }
}

// Add proper type annotation for id parameter
export async function getUserById(id: string | number) {
  const result = await db.query(
    "SELECT id, email, name FROM users WHERE id = $1",
    [id]
  );
  return result[0] || null;
}
