import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

export default {
  schema: "./db/schema/*",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: Deno.env.get("DATABASE_URL") || "",
  },
  verbose: true,
  strict: true,
} satisfies Config;
