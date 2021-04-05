const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new InjectManifest({
      swSrc: './src/serviceWorker.js',
    })
  ]
};