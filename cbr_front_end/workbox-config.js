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
            urlPattern: ({url}) => url.pathname.startsWith("http://localhost:8080/api/v1/"),
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "requests",
            }
        }
    ],
};
//Might need to change swDest since sw.js must be in public
//TODO: remove the use of workbox-config and the generateSW from package.json and instead use library to create own SW
// or configure workbox-config to cache requests
