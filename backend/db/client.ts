import { Client } from "postgres";

// Load environment variables
const DATABASE_URL = Deno.env.get("DATABASE_URL");

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

// Create a new PostgreSQL client
const client = new Client(DATABASE_URL);

/**
 * Connects to the PostgreSQL database.
 */
export async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to the PostgreSQL database.");
  } catch (error) {
    console.error("Failed to connect to the PostgreSQL database:", error);
    throw error;
  }
}

/**
 * Disconnects from the PostgreSQL database.
 */
export async function disconnectDB() {
  try {
    await client.end();
    console.log("Disconnected from the PostgreSQL database.");
  } catch (error) {
    console.error("Failed to disconnect from the PostgreSQL database:", error);
    throw error;
  }
}

export default client;
