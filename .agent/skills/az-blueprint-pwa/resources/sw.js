const CACHE_NAME = 'pwa-cache-v1';

const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
];

// Installation & Precache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// Nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes (Stale-while-revalidate ou Network-first)
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET et les requêtes cross-origin ou API spécifiques si besoin
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Mettre en cache la nouvelle réponse pour la prochaine fois
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // En cas d'échec du réseau, retourner le cache si disponible
        // On pourrait aussi retourner une page "offline.html" ici
      });

      // Retourner la réponse en cache immédiatement si elle existe, sinon attendre le réseau
      return cachedResponse || fetchPromise;
    })
  );
});
