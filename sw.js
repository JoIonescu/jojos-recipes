// Jojo's Recipes — Service Worker v3
var CACHE = 'jojos-v3';
self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  // Delete ALL old caches to force fresh load
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function(e) {
  e.respondWith(
    fetch(e.request).then(function(res) {
      var clone = res.clone();
      caches.open(CACHE).then(function(cache) { cache.put(e.request, clone); });
      return res;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
