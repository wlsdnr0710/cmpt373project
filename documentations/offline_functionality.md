# Compabaility #
To ensure compatability with application please use a Chromium web browser (ie. Chrome / Edge)
Background synchronization will not work without a browser that supports SyncManager and service workers.

For most up to date list of compataible web browsers refer to MDN Web Docs: 

https://developer.mozilla.org/en-US/docs/Web/API/SyncManager

# Current Implementation #

## Caching ##
Currently precaching and runtime caching of elements is handled by Google Workbox. 
First service worker must be registered at `public/index.html`, alternatively a service worker can be 
registered at `src/index.js` however this can introduce latency as it will need to wait for react to additionally 
boot up before registering the service worker.

Precaching of static assets such as html, css, js and svg is handled in the `workboxConfig.js`. This file must be passed into  
`workbox injectManifest ./workboxConfig.js` in the build script which will use `serviceWorker.js` as a template defined in the `swsrc` key
to "inject" the desired precached assets during build time

Note: The `workbox injectManifest` command has been omitted in the npm start to reduce start up time and reduce development headache 
of potentially caching old assets

## Background Sync ##
Background sync has also been implemented using a workbox plugin. The browser will place any failed PUT, POST or DELETE requests 
(as configured in `serviceWorker.js`) in IndexedDB. The browser will decide when to resend these requests when it believes it has 
a stable internet connection. 

Note: The duration which the browser will keep stale requests can be altered and as specified in `serviceWorker.js` is currently set to 3 days.

The sync button currently present simply queries IndexedDB to ask whether it contains requests to send. If it returns greater than zero it will 
prompt the user that it is waiting for a stable internet connection to sync, otherwise return that they are all synced. 

# Usage #
Precaching can be adjusted to add / remove file times in the `workbox-config.js`. 

Runtime caching/request caching can be adjusted in the `service-worker.js` template. 

# Testing #
To test the offline / background sync features, use the chrome developer tools (F12) and navigate to the service worker section under Application. There should 
be a checkbox to simulate offline functionality. Workbox addionally suggests closing down the localhost server running the backend as 
"The offline checkbox in DevTools only affects requests from the page. Service Worker requests will continue to go through."

# Deployment #
When Workbox is imported through a CDN it will detect whether it is being run in localhost or a production URL. Logging will be removed
if it detects a production URL. 
