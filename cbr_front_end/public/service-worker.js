/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

workbox.routing.registerRoute(
  new RegExp("http://localhost:8080/api/v1/"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'requests',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp(/\.(?:png|jpg|jpeg)$/),
  new workbox.strategies.CacheFirst({
    cacheName: 'images'
  }),
)

