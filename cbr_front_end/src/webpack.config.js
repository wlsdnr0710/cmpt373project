const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new InjectManifest({
      swSrc: './src/service-worker.js',
    })
  ]
};