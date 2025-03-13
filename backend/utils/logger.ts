// backend/utils/logger.ts
import { log } from "../deps.ts";
import { getConfig } from "./config.ts";

let logger: log.Logger;

export async function setupLogger() {
  const config = await getConfig();
  const isDevelopment = config.ENV === "development";

  await log.setup({
    handlers: {
      console: new log.ConsoleHandler(isDevelopment ? "DEBUG" : "INFO"),
    },
    loggers: {
      default: {
        level: isDevelopment ? "DEBUG" : "INFO",
        handlers: ["console"],
      },
    },
  });

  logger = log.getLogger();

  logger.info("Logger initialized", {
    env: config.ENV,
    timestamp: new Date().toISOString(),
  });

  return logger;
}

// Export a default logger for imports before setup
logger = log.getLogger();
export { logger };
