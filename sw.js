const CACHE_NAME = 'listes-de-courses-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/main.js',
    '/style.css',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache);
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
    );
});
