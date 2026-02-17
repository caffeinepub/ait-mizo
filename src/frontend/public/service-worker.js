const CACHE_NAME = 'ait-mizo-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/generated/ait-mizo-logo.dim_1200x400.png',
  '/assets/generated/ait-mizo-icon.dim_512x512.png',
  '/assets/generated/ait-mizo-favicon.dim_64x64.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch(() => {
        // Silent fail - cache is optional
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(() => {
        // Return a basic offline page or just fail silently
        return new Response('Offline', { status: 503 });
      })
  );
});

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
    })
  );
});
