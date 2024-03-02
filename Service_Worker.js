
//asignar un nombre y versión al cache
const CACHE_NAME = 'La Fronterísima',
  urlsToCache = [
    '',
    'index.html',
    'css/radio.css',
    'font-awesome.css',
    'css/fonts-icon.css',
    'css/animate.css',
    'css/lightbox.min.css',
    'css/jquery.scrollflow.css',
    'owl/assets/owl.carousel.min.css',

  
    'js/jquery 1.9.0.min.js',
    'js/prefix.min.js',
    'js/image.js',
    'js/lightbox-plus-jquery.min.js',
    'js/lightbox.min.js',
    'js/jquery.scrollflow.min.js',
    'js/app.js',
    'js/ajax.js',
    'js/pulsar.js',
    'js/audio.js',
    'js/menu.js',
    'js/main.js',
    'js/share.js',
    'js/ajaxfom.js',
    'js/header.js',
    'js/script.js',
    'js/navegar.js',
    'js/imagesslider01.js',
    'js/imagesslider1.js',
    'js/imagesslider2.js',
    'js/imagesslider3.js',
    'js/prueba.js',
    'js/floating-wpp.js',
    'js/stream.js',
 
    'regist_serviceWorker.js',
    'pwa/icon-512x512.png',
    'pwa/icon-72x72.png'
  ]


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

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
         
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
   
      .then(() => self.clients.claim())
  )
})


self.addEventListener('fetch', e => {

  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
        
          return res
        }
       
        return fetch(e.request)
      })
  )
})
