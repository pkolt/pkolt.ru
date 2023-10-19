import fs from 'node:fs';
import path from 'node:path';
import { DateTime } from 'luxon';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import remarkYoutube from 'remark-youtube';

const SITE_URL = 'https://pkolt.ru';

/** @type {import('astro/config').AstroUserConfig} */
const config = {
  site: SITE_URL,
  integrations: [
    react(),
    sitemap({
      priority: 0.6, // default <priority>
      changefreq: 'daily', // default <changefreq>
      filter: (url) => !url.endsWith('/about/'),
      serialize: (item) => {
        if (item.url.endsWith('/')) {
          item.url = item.url.slice(0, -1);
        }

        if (item.url === SITE_URL) {
          item.priority = 1.0;
          item.lastmod = DateTime.now().toISO();
        }

        if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          const postFile = path.resolve('./', 'src/pages', `${new URL(item.url).pathname.slice(1)}.md`);
          const postContent = fs.readFileSync(postFile, 'utf8');
          const modified = /modified:\s+(\d{4}-\d{2}-\d{2})/.exec(postContent)[1];
          if (modified) {
            item.lastmod = DateTime.fromSQL(modified).toISO();
          }
        }

        return item;
      },
    }),
  ],
  compressHTML: true,
  markdown: {
    remarkPlugins: [remarkYoutube],
    gfm: true,
    syntaxHighlight: 'prism',
  },
  outDir: 'out',
  cacheDir: 'cache',
  redirects: {
    '/arduino-cpp': '/blog/arduino-cpp',
    '/arduino-number-to-string': '/blog/arduino-number-to-string',
    '/css-grid-examples': '/blog/css-grid-examples',
    '/esp32-button-interrupt': '/blog/esp32-button-interrupt',
    '/esp32-nvs': '/blog/esp32-nvs',
    '/esp32-spiffs': '/blog/esp32-spiffs',
    '/esp32-wifi': '/blog/esp32-wifi',
    '/fake-board-wemos-d1-mini': '/blog/fake-board-wemos-d1-mini',
    '/first-react-native-app': '/blog/first-react-native-app',
    '/good-nodejs-modules': '/blog/good-nodejs-modules',
    '/make-fotoresist-plate': '/blog/make-fotoresist-plate',
    '/overview-arduino-pro-mini': '/blog/overview-arduino-pro-mini',
    '/overview-arduino-uno': '/blog/overview-arduino-uno',
    '/overview-atmega328p': '/blog/overview-atmega328p',
    '/overview-attiny13a': '/blog/overview-attiny13a',
    '/overview-esp-01': '/blog/overview-esp-01',
    '/overview-esp32': '/blog/overview-esp32',
    '/overview-wemos-d1-mini': '/blog/overview-wemos-d1-mini',
    '/remark-youtube': '/blog/remark-youtube',
    '/set-timezone-mariadb-mac': '/blog/set-timezone-mariadb-mac',
    '/this-expression-is-not-constructable': '/blog/this-expression-is-not-constructable',
  },
};

export default defineConfig(config);
