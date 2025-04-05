import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./client.ts";

async function main() {
  console.log("Running migrations...");
  await migrate(db, { migrationsFolder: "./db/migrations" });
  console.log("Migrations completed!");
}

main();
