// backend/db/migrations/migrate.ts
import { Pool } from "../../deps.ts";
import { logger } from "../../utils/logger.ts";
import { getPool } from "../client.ts";

// Migration files in order
const migrations = [
  {
    name: "initial_schema",
    sql: `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        username TEXT UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Verses table
      CREATE TABLE IF NOT EXISTS verses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        book TEXT NOT NULL,
        chapter INTEGER NOT NULL,
        verse INTEGER NOT NULL,
        text TEXT NOT NULL,
        UNIQUE(book, chapter, verse)
      );
      
      -- User favorites
      CREATE TABLE IF NOT EXISTS user_favorites (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        verse_id UUID NOT NULL REFERENCES verses(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, verse_id)
      );
    `,
  },
  {
    name: "add_user_profile",
    sql: `
      -- Add profile fields to users
      ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name TEXT;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
    `,
  },
];

export async function migrate() {
  const pool = await getPool();
  const client = await pool.connect();

  try {
    logger.info("Starting database migrations");

    // Create migrations table if it doesn't exist
    await client.queryArray(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Get executed migrations
    const { rows: executedMigrations } = await client.queryObject<{
      name: string;
    }>("SELECT name FROM _migrations ORDER BY id");
    const executedMigrationNames = new Set(
      executedMigrations.map((row) => row.name)
    );

    // Run pending migrations
    for (const migration of migrations) {
      if (executedMigrationNames.has(migration.name)) {
        logger.debug(
          `Migration '${migration.name}' already executed, skipping`
        );
        continue;
      }

      logger.info(`Executing migration: ${migration.name}`);

      // Begin transaction
      await client.queryArray("BEGIN");

      try {
        // Execute migration
        await client.queryArray(migration.sql);

        // Record migration
        await client.queryArray("INSERT INTO _migrations (name) VALUES ($1)", [
          migration.name,
        ]);

        // Commit transaction
        await client.queryArray("COMMIT");
        logger.info(`Migration '${migration.name}' completed successfully`);
      } catch (error) {
        // Rollback on error
        await client.queryArray("ROLLBACK");
        logger.error({ error }, `Migration '${migration.name}' failed`);
        throw error;
      }
    }

    logger.info("All migrations completed successfully");
  } finally {
    client.release();
    await pool.end();
  }
}

// Run migrations directly if script is executed
if (import.meta.main) {
  try {
    await migrate();
    Deno.exit(0);
  } catch (error) {
    logger.error({ error }, "Migration failed");
    Deno.exit(1);
  }
}
