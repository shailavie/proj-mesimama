// vue.config.js
module.exports = {
    pwa: {
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
          swSrc: 'src/registerServiceWorker.js'
      },
      themeColor: '#1da025'
    },
  }