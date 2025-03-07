import { Pool } from "@neondatabase/serverless";

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: true,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
});

/**
 * Executes a query on the Neon PostgreSQL database.
 * @param {string} text - The SQL query string.
 * @param {Array<any>} [params] - Optional parameters for the query.
 * @returns {Promise<any>} - The result of the query.
 */
export async function query(text: string, params?: Array<any>): Promise<any> {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Failed to execute database query");
  } finally {
    client.release();
  }
}

/**
 * Closes the database connection pool.
 * Useful for cleaning up resources during application shutdown.
 */
export async function closePool(): Promise<void> {
  await pool.end();
}

export default pool;