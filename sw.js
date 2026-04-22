// Jojo’s Recipes — Service Worker (network-first = always gets latest version)
self.addEventListener(‘install’, function(e) { self.skipWaiting(); });
self.addEventListener(‘activate’, function(e) { self.clients.claim(); });
self.addEventListener(‘fetch’, function(e) {
// Always try network first; fall back to cache only if offline
e.respondWith(
fetch(e.request).then(function(res) {
var clone = res.clone();
caches.open(‘jojos-v2’).then(function(cache) { cache.put(e.request, clone); });
return res;
}).catch(function() {
return caches.match(e.request);
})
);
});