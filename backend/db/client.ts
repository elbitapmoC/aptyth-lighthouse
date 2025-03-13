// backend/db/client.ts
import { Pool, type PoolClient } from "../deps.ts";
import { getConfig } from "../utils/config.ts";
import { logger } from "../utils/logger.ts";

// Database connection configuration
const DEFAULT_POOL_SIZE = 5;
const MAX_CONNECTION_ATTEMPTS = 5;
const RETRY_DELAY_MS = 2000;

// Create a singleton pool instance
let poolInstance: Pool | null = null;

/**
 * Gets or creates the database connection pool
 * @returns The database connection pool
 */
export async function getPool(): Promise<Pool> {
  if (poolInstance) {
    return poolInstance;
  }

  const config = await getConfig();

  // Create the pool with better configuration
  poolInstance = new Pool(
    config.databaseUrl,
    DEFAULT_POOL_SIZE, // Increased pool size for better concurrency
    true // Use lazy initialization
  );

  // Test the connection
  await testConnection();

  return poolInstance;
}

// Create and export the db object with query methods
export const db = {
  async query(text: string, params: unknown[] = []) {
    const pool = await getPool();
    const client = await pool.connect();
    try {
      const result = await client.queryObject(text, params);
      return result.rows;
    } finally {
      client.release();
    }
  },

  async transaction<T>(
    callback: (client: PoolClient) => Promise<T>
  ): Promise<T> {
    const pool = await getPool();
    const client = await pool.connect();
    try {
      await client.queryObject("BEGIN");
      const result = await callback(client);
      await client.queryObject("COMMIT");
      return result;
    } catch (error) {
      await client.queryObject("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};

/**
 * Tests the database connection with retry logic
 */
async function testConnection(): Promise<void> {
  let attempts = 0;
  let lastError: unknown;

  while (attempts < MAX_CONNECTION_ATTEMPTS) {
    try {
      if (!poolInstance) {
        throw new Error("Pool instance is not initialized");
      }
      const client = await poolInstance.connect();
      try {
        // Simple query to test the connection
        const result = await client.queryObject("SELECT 1 as connected");
        logger.info("Database connection established successfully");
        return;
      } finally {
        client.release();
      }
    } catch (error) {
      lastError = error;
      attempts++;
      logger.error(
        { error, attempt: attempts, maxAttempts: MAX_CONNECTION_ATTEMPTS },
        "Database connection failed, retrying..."
      );

      if (attempts < MAX_CONNECTION_ATTEMPTS) {
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }

  // If we get here, all connection attempts failed
  logger.error({ lastError }, "All database connection attempts failed");
  throw new Error(
    `Failed to connect to database after ${MAX_CONNECTION_ATTEMPTS} attempts`
  );
}

/**
 * Checks if the database connection is healthy
 * @returns True if the connection is healthy, false otherwise
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const pool = await getPool();
    const client = await pool.connect();
    try {
      await client.queryObject("SELECT 1 as connected");
      return true;
    } finally {
      client.release();
    }
  } catch (error) {
    logger.error({ error }, "Database health check failed");
    return false;
  }
}

// Export the pool getter for use in other modules
export { getPool as pool };
