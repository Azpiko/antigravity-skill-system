/* 
  Service Worker Template - PWA Offline Mastery
  Optimisé pour Next.js (Static Export)
*/

import { ExpirationPlugin } from 'workbox-expiration';
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

// 1. Precaching (Injecté par workbox-build au build)
precacheAndRoute(self.__WB_MANIFEST || []);

// 2. Routage pour les Pages Statiques (SPA Fallback)
// Permet de servir index.html pour les routes profondes en mode export
const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler, {
  allowlist: [/^(?!\/__).*/], // Évite d'intercepter certains chemins système
});
registerRoute(navigationRoute);

// 3. Cache pour les Images (Cache First)
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
      }),
    ],
  })
);

// 4. Cache pour les Scripts/Styles (Stale While Revalidate)
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// 5. Background Sync Manuel (Alternative si l'API n'est pas dispo)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
