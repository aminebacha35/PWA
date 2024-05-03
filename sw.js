const CACHE_NAME = 'pwa-films-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/favorites.html',
    '/styles.css',
    '/main.js',
    '/favorites.js',
    '/manifest.json'
];

self.addEventListener('install', event => {
    // Installer le service worker et mettre en cache les fichiers
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    // Intercepter les requêtes et renvoyer les fichiers mis en cache si disponibles
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
