/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// Disable eslint since importing workbox from CDN
importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js"
);

const MAX_RETRY_MIN = 3 * 24 * 60;
const SYNC_QUEUE_NAME = "syncQueue";

// Biting the bullet and hardcoding server host name 
// - Workbox cannot take a regex expression for third party requests, must take full URL 
// - Can't use enviornment variables, DOM, or importing modules to get information into service worker 
// TODO: Must change SERVER_HOST for production to "https://cmpt373-1211-03.cmpt.sfu.ca"
const SERVER_HOST = "http://localhost:8080";

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const backgroundSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(
    SYNC_QUEUE_NAME,
    {
        // Configure maximum amount of time in minutes request will try to sync
        maxRetentionTime: MAX_RETRY_MIN,
    }
);

workbox.routing.registerRoute(
    new RegExp(SERVER_HOST),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "requests",
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
    "GET"
);

workbox.routing.registerRoute(
    new RegExp(/\.(?:png|jpg|jpeg)$/),
    new workbox.strategies.CacheFirst({
        cacheName: "images",
    })
);

// Cannot specify a route with POST, PUT and DELETE 
workbox.routing.registerRoute(
    new RegExp(SERVER_HOST),
    new workbox.strategies.NetworkOnly({
        plugins: [backgroundSyncPlugin],
    }),
    "POST"
);

workbox.routing.registerRoute(
    new RegExp(SERVER_HOST),
    new workbox.strategies.NetworkOnly({
        plugins: [backgroundSyncPlugin],
    }),
    "PUT"
);

workbox.routing.registerRoute(
    new RegExp(SERVER_HOST),
    new workbox.strategies.NetworkOnly({
        plugins: [backgroundSyncPlugin],
    }),
    "DELETE"
);
