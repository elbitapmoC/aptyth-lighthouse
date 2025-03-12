// backend/utils/config.ts
import { config as loadEnv } from "../deps.ts"; // Use deps.ts for consistency
import { z } from "../deps.ts";

// Load environment variables immediately
await loadEnv({ export: true });

// Define a Zod schema for your configuration
const configSchema = z.object({
  port: z.coerce.number().default(8000), // Use coerce for type conversion and default
  databaseUrl: z.string().min(1), // Ensure it's not an empty string
  jwtSecret: z.string().min(1), // Ensure it's not an empty string
});

// Get all environment variables as an object
const env = Deno.env.toObject();

// Parse and validate the environment variables
const parsedConfig = configSchema.safeParse({
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  jwtSecret: env.JWT_SECRET,
});

// Handle validation errors
if (!parsedConfig.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    parsedConfig.error.flatten()
  );
  Deno.exit(1); // Exit with an error code
}

// Export the validated configuration
export const config = parsedConfig.data;

// Export the type for use elsewhere (VERY important)
export type Config = z.infer<typeof configSchema>;
