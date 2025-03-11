// backend/utils/logger.ts
import * as log from "../deps.ts";

// Configure logging
export async function setupLogger() {
  await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler("DEBUG", {
        formatter: "{levelName} {msg}",
      }), // Customize as needed
    },
    loggers: {
      default: {
        level: "DEBUG",
        handlers: ["console"],
      },
    },
  });
}

export const logger = log.getLogger();
