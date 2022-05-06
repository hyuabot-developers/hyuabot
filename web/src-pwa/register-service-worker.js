import { register } from 'register-service-worker'
import { workbox } from '@quasar/app-vite/lib/modes/pwa/pwa-config';
import { NetworkFirst } from 'workbox-strategies';
const { googleAnalytics, CacheableResponsePlugin, StaleWhileRevalidate, expiration, routing, strategies } = workbox
const { ExpirationPlugin } = expiration
const { registerRoute } = routing
const { CacheFirst } = strategies

register(process.env.SERVICE_WORKER_FILE, {
  ready () {
    console.log('Service worker is active.')

    // Cache Google Fonts
    registerRoute(
      /^https:\/\/fonts\.gstatic\.com/,
      new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 365, // 365 Days
          }),
        ],
      }),
    );

    // Cache JavaScript and CSS
    registerRoute(/\.(?:js|css)$/, new StaleWhileRevalidate());

    // Cache Images
    registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      new CacheFirst({
        cacheName: 'images',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 Days
          }),
        ],
      }),
    );

    // Cache Shuttle Arrivals
    registerRoute(
      /^https:\/\/api\.hyuabot\.app\/api\/v1\/shuttle\/arrival/,
      new NetworkFirst({
        cacheName: 'shuttle-arrival',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: 60 * 5, // 5 Minutes
          }),
        ],
      }),
    );

    // Cache Shuttle Timetable
    registerRoute(
      /^https:\/\/api\.hyuabot\.app\/api\/v1\/shuttle\/timetable/,
      new NetworkFirst({
        cacheName: 'shuttle-timetable',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 Days
          }),
        ],
      }),
    );

    // Offline Google Analytics
    googleAnalytics.initialize();

  },

  registered () {
    console.log('Service worker has been registered.')
  },

  cached () {
    console.log('Content has been cached for offline use.')
  },

  updatefound () {
    console.log('New content is downloading.')
  },

  updated () {
    console.log('New content is available; please refresh.')
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },

  error (error) {
    console.error('Error during service worker registration:', error)
  }
})
