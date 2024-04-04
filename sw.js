"use strict";

// Set files to cache
const version = "v3";
const cacheName = `myapp-${version}`;
const filesToCache = [
    "/index.html",
    "/style.css",

];

// When installing the service worker,
// Cache assets.
self.addEventListener("insall", (e) => {
    console.log("[SW] install");
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log("[SW] Caching files");
        await cache.addAll(filesToCache);
    })());
});

// Add a middleware to fetch,
// Use cache to avoid network usage.
// And cache cacheable requests.
self.addEventListener("fetch", (e) => {
    console.log("[SW] Fetching url: ", e.request.url);
    e.respondWith((async () => {
        // If the request has already been cached,
        // return the cached value to avoid unnecessary
        // network usage.
        const match = await caches.match(e.request);
        if (match) return match;

        const response = await fetch(e.request);

        if (e.request.method === "GET" && !(e.request.headers.get("Cache-Control") === "no-cache" || e.request.headers.get("Cache-Control") === "no-store")) {
            const cache = await caches.open(cacheName);
            console.log("[SW] Caching new resource: ", e.request.url);
            cache.put(e.request, response.clone());
        }

        return response;
    })())
});

// Remove old content from cache to free disk space
self.addEventListener("activate", (e) => {
    e.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => {
            if (key === cacheName) return;
            return caches.delete(key);
        }));
    })());
});