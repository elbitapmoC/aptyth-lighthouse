// app/sw.ts
/// <reference lib="webworker" />

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry } from "@serwist/precaching";
import { installSerwist } from "@serwist/sw";

// Make TypeScript aware of the __SW_MANIFEST property injected by Serwist
declare global {
  interface WorkerGlobalScope {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}
declare const self: ServiceWorkerGlobalScope;

console.log("Serwist service worker script initializing..."); // Add logs if needed

installSerwist({
  precacheEntries: self.__SW_MANIFEST, // Use the injected precache manifest
  skipWaiting: true, // Activate new SW immediately
  clientsClaim: true, // Take control of clients immediately
  navigationPreload: true, // Enable navigation preloads if browser supports it
  runtimeCaching: defaultCache, // Use Serwist's default runtime caching strategies
  // You can customize runtimeCaching further here if needed
});

// You can still add custom event listeners if necessary,
// but Serwist handles install/activate/fetch based on the config above.
self.addEventListener("message", (event) => {
  console.log("SW received message:", event.data);
});
