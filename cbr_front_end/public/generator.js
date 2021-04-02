const workbox = require("workbox-build");

workbox.generateSW({
    cacheId:"cbr_worker",
    globDirectory: "./",
    globPatterns: ["**/*.{html,json,js,css,svg}"],
    swDest: "./service-worker.js",
})