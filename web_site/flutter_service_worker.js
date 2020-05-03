'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "3afa81b1d715a7a3cdca2f10b5b9e52d",
"assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/images/background_1.jpg": "18b46b3e9fe20e5d255a708c7b31bec5",
"assets/images/background_2.jpg": "9cac8be1e061e684cb449f40e36323b7",
"assets/LICENSE": "53731c4d5aebedd0e6f56d3e779c9707",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "c9937b022019ef05381afec4989bb701",
"/": "c9937b022019ef05381afec4989bb701",
"main.dart.js": "cce0bd9b952f84b82f081a72e265eb14",
"manifest.json": "6e2b0b8f01953390a6eb22d1e2897e09"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
