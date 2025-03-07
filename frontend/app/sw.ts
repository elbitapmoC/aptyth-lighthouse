import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

// Precache files generated during the build process
precacheAndRoute(self.__WB_MANIFEST || []);

// Claim clients immediately after the service worker activates
self.addEventListener("activate", (event) => {
  event.waitUntil(clientsClaim());
});

// Cache API responses from Serwist
registerRoute(
  ({ url }) => url.origin === process.env.SERWIST_API_URL,
  new StaleWhileRevalidate({
    cacheName: "serwist-api-cache",
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          // Only cache successful responses
          return response.status === 200 ? response : null;
        },
      },
    ],
  })
);

// Cache static assets like images, stylesheets, and scripts
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image",
  new CacheFirst({
    cacheName: "static-assets-cache",
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          // Only cache successful responses
          return response.status === 200 ? response : null;
        },
      },
    ],
  })
);

// Listen for push notifications
self.addEventListener("push", (event) => {
  const data = event.data?.json();
  if (data) {
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || "/icons/icon-192x192.png",
      badge: data.badge || "/icons/icon-192x192.png",
      data: data.url,
    });
  }
});

// Handle notification click events
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data;
  if (url) {
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  }
});
