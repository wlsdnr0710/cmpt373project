// TODO: Get  
// import {getServerConfigByEnvironment} from "./src/config/ServerConfig";
// const server = require("./config/ServerConfig.js")
// const server = getServerConfigByEnvironment();


module.exports = {
    globDirectory: "build/",
    // Continue to cache svg since all icons are svg
    globPatterns: ["**/*.{html,json,js,css,svg}"],
    swDest: "build/sw.js",
    // Cache images at runtime rather in preCache to avoid caching large amounts of large image files
    runtimeCaching: [
        {
            urlPattern: /\.(?:png|jpg|jpeg)$/,
            handler: "CacheFirst",
            options: {
                cacheName: "images",
            },
        },
        {
            urlPattern: new RegExp("http://localhost:8080/api/v1/"),
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "requests",
                expiration: {
                    maxEntries: 50,
                    // Set max age of entries to 2 days 
                    maxAgeSeconds: 48 * 60 * 60,
                },
                cacheableResponse: { statuses: [200] },
            },
        },
        // {
        //     urlPattern: new RegExp("http://localhost:8080/api/v1/"),
        //     handler: "CacheFirst",
        //     options: {
        //         cacheName: "failed"
        //     },
        //     cacheableResponse: { statuses: [] }, <-- problem, there is no error code returned if disconnected 
        // }
    ],
};
//TODO: remove the use of workbox-config and the generateSW from package.json and instead use library to create own SW
// or configure workbox-config to cache requests
