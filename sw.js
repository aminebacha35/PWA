"use strict";

const version = "v1";
const cacheName = `myapp-${version}`;
const filesToCache = [
    "/index.html",
    "/style.css",

];

self.addEventListener("insall", (e) => {
    console.log("[SW] install");
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log("[SW] Caching files");
        await cache.addAll(filesToCache);
    })());
});


self.addEventListener("fetch", (e) => {
    console.log("[SW] Fetching url: ", e.request.url);
    e.respondWith((async () => {
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

self.addEventListener("activate", (e) => {
    e.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => {
            if (key === cacheName) return;
            return caches.delete(key);
        }));
    })());
});