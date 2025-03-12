//backend/db/queries.ts

import { z } from "../deps.ts";
import type { User } from "../models/user.ts"; // Import type
import { UserSchema } from "../models/user.ts";
import { type Verse, VerseSchema } from "../models/verse.ts";
// backend/db/queries.ts
import { pool } from "./client.ts";

// --- User Queries ---
export async function createUser(
  email: string,
  passwordHash: string
): Promise<User | null> {
  const client = await pool.connect();
  try {
    const result = await client.queryObject(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, password, created_at, updated_at",
      [email, passwordHash]
    );
    // Validate
    if (result.rows.length > 0) {
      const userResult = UserSchema.safeParse(result.rows[0]); // Validate the DB response
      if (!userResult.success) {
        console.error(
          "createUser: Database record failed validation:",
          userResult.error
        );
        throw new Error(
          `Database record failed validation: ${userResult.error.message}`
        ); // Throw!
      }
      return userResult.data;
    }
    return null;
  } finally {
    client.release();
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await pool.connect();
  try {
    const result = await client.queryObject(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      const userResult = UserSchema.safeParse(result.rows[0]);
      if (!userResult.success) {
        console.error(
          "getUserByEmail: Database record failed validation:",
          userResult.error
        );
        return null; // Or throw an error
      }
      return userResult.data;
    }
    return null;
  } finally {
    client.release();
  }
}
// Verse Queries
export async function getVerse(
  version: string,
  book: string,
  chapter: number,
  verse: number
): Promise<Verse | null> {
  const client = await pool.connect();

  try {
    const result = await client.queryObject(
      `SELECT book, chapter, verse, text, version FROM verses
                WHERE version = $1 AND book = $2 AND chapter = $3 AND verse = $4`,
      [version, book, chapter, verse]
    );
    if (result.rows.length > 0) {
      const verseResult = VerseSchema.safeParse(result.rows[0]); // Validate the DB response
      if (!verseResult.success) {
        console.error(
          "getVerse: Database record failed validation:",
          verseResult.error
        );
        return null; // Or throw an error, depending on error handling.
      }
      return verseResult.data;
    }
    return null;
  } finally {
    client.release();
  }
}
