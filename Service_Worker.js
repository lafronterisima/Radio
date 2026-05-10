
// Service Worker optimizado para La Fronterísima
const CACHE_NAME = 'la-fronterisima-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/materialize.css',
  '/css/style.css',
  '/css/combined.min.css',
  '/js/jquery-1.9.0.min.js',
  '/js/lazy-iframes.js',
  '/js/menu.js',
  '/js/materialize.js',
  '/manifest.json',
  '/pwa/icon-512x512.png',
  '/pwa/icon-72x72.png',
  '/imagenes/frontera.png',
  '/image/frontera.png'
];


self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

// Activación y limpieza de caches antiguos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log('Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Manejo de mensajes para actualización manual
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Estrategia de cache optimizada
const cacheStrategy = {
  // Para recursos estáticos - Cache First
  static: (request) => {
    return caches.match(request).then(response => {
      if (response) {
        return response;
      }
      return fetch(request).then(response => {
        // Solo cacheamos respuestas exitosas
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });
        return response;
      });
    });
  },
  
  // Para recursos dinámicos - Network First
  dynamic: (request) => {
    return fetch(request).then(response => {
      if (!response || response.status !== 200) {
        return caches.match(request);
      }
      const responseToCache = response.clone();
      caches.open(CACHE_NAME).then(cache => {
        cache.put(request, responseToCache);
      });
      return response;
    }).catch(() => {
      return caches.match(request);
    });
  }
};

// Interceptación de peticiones
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Solo cacheamos peticiones GET y HTTP/HTTPS
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }
  
  // Estrategia según el tipo de recurso
  if (url.pathname.includes('/css/') || url.pathname.includes('/js/') || 
      url.pathname.includes('/imagenes/') || url.pathname.includes('/image/') ||
      url.pathname.includes('/pwa/')) {
    // Recursos estáticos - Cache First
    event.respondWith(cacheStrategy.static(request));
  } else {
    // Recursos dinámicos - Network First
    event.respondWith(cacheStrategy.dynamic(request));
  }
});
