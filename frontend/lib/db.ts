import { Pool } from "@neondatabase/serverless";

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: true,
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
