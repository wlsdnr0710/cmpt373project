/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// importScripts("./config/ServerConfig");
importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js"
);

const MAX_RETRY_MIN = 3 * 24 * 60;
const SYNC_QUEUE_NAME = "syncQueue";
const cacheRegExp = "http://localhost:8080/api/v1";

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const backgroundSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(
    SYNC_QUEUE_NAME,
    {
        // Configure maximum amount of time in minutes request will try to sync
        maxRetentionTime: MAX_RETRY_MIN,
        // TODO: insert callback function to let user know that they are back online and synced
    }
);

workbox.routing.registerRoute(
    new RegExp("http://localhost:8080/api/v1"),
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

workbox.routing.registerRoute(
    // Match requests to server based on "/api/v1/" to avoid having to specify localhost or production server
    new RegExp("http://localhost:8080/api/v1"),
    new workbox.strategies.NetworkOnly({
        plugins: [backgroundSyncPlugin],
    }),
    "POST"
);

workbox.routing.registerRoute(
    new RegExp("http://localhost:8080/api/v1"),
    new workbox.strategies.NetworkOnly({
        plugins: [backgroundSyncPlugin],
    }),
    "PUT"
);

workbox.routing.registerRoute(
    new RegExp("http://localhost:8080/api/v1"),
    new workbox.strategies.NetworkOnly({
        plugins: [backgroundSyncPlugin],
    }),
    "DELETE"
);
