const CACHE_NAME = "version-1";
const urlToCache = ["index.html", "offline.html"]; //represents the page that is shown when no internet connection

// install SW
//self represents the SW
self.addEventListener("install", (event) => {
  //wait until cache is opened
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlToCache);
    })
  );
});

// listen for requests
// fetch the request from server every time to get updated data and if failed return offline.html
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

//  activate SW
// we going to have lot of versions of cache
// remove previous cache and only keep new cache
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
