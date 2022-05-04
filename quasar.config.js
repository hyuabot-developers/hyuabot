const { configure } = require('quasar/wrappers');
const path = require('path');

module.exports = configure(function (/* ctx */) {
  return {
    eslint: {
      warnings: true,
      errors: true
    },

    boot: [
      'i18n',
      'axios',
    ],

    css: [
      'app.scss'
    ],

    extras: [
      'mdi-v5',
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      env: require('dotenv').config().parsed,
      target: {
        browser: [ 'es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1' ],
        node: 'node16'
      },

      vueRouterMode: 'history', // available values: 'hash', 'history'
      vitePlugins: [
        ['@intlify/vite-plugin-vue-i18n', {
          include: path.resolve(__dirname, './src/i18n/**')
        }]
      ]
    },

    devServer: {
      open: false,
    },

    framework: {
      config: {
        dark: 'auto'
      },
      plugins: []
    },

    animations: [],
    ssr: {
      pwa: true,
      prodPort: 3000,
      middlewares: [
        'render'
      ]
    },

    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
    },
    cordova: {
    },

    capacitor: {
      hideSplashscreen: true
    },

    electron: {

      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {},

      builder: {
        appId: 'hyuabot-client-web'
      }
    },

    bex: {
      contentScripts: [
        'my-content-script'
      ],
    }
  }
});
