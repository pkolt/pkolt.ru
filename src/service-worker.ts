/// <reference lib="webworker" />
import type { RouteMatchCallback } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope;

const cacheResponse = new CacheableResponsePlugin({
  statuses: [0, 200],
});

// Cache First
const cacheName = 'workbox-cache-first';
const matchCallback: RouteMatchCallback = ({ request, url }) => {
  return (
    // HTML pages
    request.destination === 'document' ||
    // CSS
    request.destination === 'style' ||
    // JavaScript
    request.destination === 'script' ||
    // Web Workers
    request.destination === 'worker' ||
    // Fonts
    request.destination === 'font' ||
    // Images
    (request.destination === 'image' && !url.pathname.startsWith('/posts')) ||
    // Manifest
    request.destination === 'manifest' ||
    // Text files (for Next.js)
    url.pathname.endsWith('.txt')
  );
};

const strategy = new CacheFirst({
  cacheName,
  plugins: [cacheResponse],
  matchOptions: {
    ignoreMethod: false,
    ignoreSearch: false,
    ignoreVary: false,
  },
});

registerRoute(matchCallback, strategy);

const clearCache = async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));
};

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    clearCache().then(() => setTimeout(() => self.skipWaiting(), 1000));
  }
});
