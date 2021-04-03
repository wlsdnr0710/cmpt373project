// TODO: Get  
// import {getServerConfigByEnvironment} from "./src/config/ServerConfig";
// const server = require("./config/ServerConfig.js")
// const server = getServerConfigByEnvironment();


module.exports = {
    globDirectory: "build/",
    // Continue to cache svg since all icons are svg
    globPatterns: ["**/*.{html,json,js,css,svg}"],
    swDest: "build/service-worker.js",
    swSrc: "src/service-worker.js",
    // injectionPointRegexp: /(const precacheManifest = )\[\](;)/
};
//TODO: remove the use of workbox-config and the generateSW from package.json and instead use library to create own SW
// or configure workbox-config to cache requests
