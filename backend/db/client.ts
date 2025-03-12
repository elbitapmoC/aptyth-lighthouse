// backend/db/client.ts
import { Pool } from "../deps.ts";
import { config } from "../utils/config.ts"; // Import the config object!

// No need for dotenv/load.ts here, it's done in config.ts

// Use the database URL from the config object
const pool = new Pool(config.databaseUrl, 3, true);

export { pool };
