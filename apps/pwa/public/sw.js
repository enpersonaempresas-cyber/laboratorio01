const CACHE_NAME = 'burger-factory-pwa-v2';
const ASSETS_TO_CACHE = [
  '/app/',
  '/app/index.html',
  '/app/manifest.json',
  '/app/icon-192.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('📱 [Service Worker] Purgando caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Ignorar peticiones a las APIs del backend
  if (event.request.url.includes('/api/')) {
    return;
  }

  // Estrategia Network-First para navegación (HTML)
  // Garantiza que siempre se obtenga el index.html más reciente y el nuevo hash de Vite
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match('/app/index.html').then((cached) => cached || caches.match('/app/')))
    );
    return;
  }

  // Para assets estáticos (CSS, JS, imágenes): Network-first con fallback a cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
