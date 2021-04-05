
module.exports = {
    globDirectory: "build/",
    // Continue to cache svg since all icons are svg
    globPatterns: ["**/*.{html,json,js,css,svg}"],
    swDest: "build/serviceWorker.js",
    swSrc: "src/serviceWorker.js",
};

