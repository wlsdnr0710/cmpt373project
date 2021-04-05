# Compabaility 
To ensure compatability with application please use a Chromium web browser (ie. Chrome, Edge)
Background synchronization will not work without a browser that supports SyncManager and service workers.

For most up to date list of compataible web browsers refer to MDN Web Docs: 

https://developer.mozilla.org/en-US/docs/Web/API/SyncManager

# Current Implementation 
Currently precaching and runtime caching of elements is handled by Google Workbox. 

First service worker must be registered at `public/index.html`, alternatively a service worker can be 
registered at `src/index.js` however this can introduce latency as it will need to wait for react to additionally 
boot up before registering the service worker.

Precaching of static assets such as html, css, js and svg is handled in the `workbox-config.js`. This file must be passed into  
`workbox injectManifest ./workbox-config.js` which will specify the service worker template in `sw/src` to "inject" the 
desired precached assets into. 

# Usage 
Precaching can be adjusted to add / remove file times in the `workbox-config.js`. 

Runtime caching/request caching can be adjusted in the `service-worker.js` template. 

# Deployment
When Workbox is imported through a CDN it will detect whether it is being run in localhost or a production URL. Logging will be removed
if it detects a production URL. 
