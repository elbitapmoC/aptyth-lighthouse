import { installSerwist } from "@serwist/sw";

/**
 * Utility functions for Serwist PWA functionality.
 * This module handles offline data synchronization and caching strategies.
 */

/**
 * Synchronizes offline data with the server.
 * This function ensures that any data created or modified while offline
 * is sent to the server once the connection is restored.
 *
 * @param syncEndpoint - The API endpoint to send offline data to.
 * @param data - The offline data to synchronize.
 * @returns A promise that resolves when the synchronization is complete.
 */
export async function synchronizeOfflineData(
  syncEndpoint: string,
  data: Record<string, unknown>[]
): Promise<void> {
  try {
    const response = await fetch(syncEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`Failed to synchronize offline data: ${response.statusText}`);
    }

    console.log("Offline data synchronized successfully.");
  } catch (error) {
    console.error("Error during offline data synchronization:", error);
    throw error;
  }
}

/**
 * Registers caching strategies for the PWA.
 * This function sets up runtime caching for specific resource types,
 * such as API responses and static assets.
 */
export function registerCachingStrategies(): void {
  installSerwist({
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.example\.com\/.*/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "image-cache",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  });

  console.log("Caching strategies registered successfully.");
}

/**
 * Initializes Serwist PWA utilities.
 * This function sets up offline synchronization and caching strategies.
 *
 * @param syncEndpoint - The API endpoint for offline data synchronization.
 * @param offlineData - The offline data to synchronize.
 */
export async function initializePWAUtilities(
  syncEndpoint: string,
  offlineData: Record<string, unknown>[]
): Promise<void> {
  try {
    await synchronizeOfflineData(syncEndpoint, offlineData);
    registerCachingStrategies();
    console.log("PWA utilities initialized successfully.");
  } catch (error) {
    console.error("Error initializing PWA utilities:", error);
  }
}
