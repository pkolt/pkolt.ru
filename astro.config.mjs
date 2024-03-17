import fs from 'node:fs';
import path from 'node:path';
import { DateTime } from 'luxon';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import remarkYoutube from 'remark-youtube';

const SITE_URL = 'https://pkolt.ru';

const trimSlash = (url) => {
  url = url.startsWith('/') ? url.slice(1) : url;
  url = url.endsWith('/') ? url.slice(0, -1) : url;
  return url;
};

/** @type {import('astro/config').AstroUserConfig} */
const config = {
  site: SITE_URL,
  integrations: [
    react(),
    sitemap({
      priority: 0.6, // default <priority>
      changefreq: 'daily', // default <changefreq>
      // filter: (url) => !url.endsWith('/about/'),
      serialize: (item) => {
        if (item.url === SITE_URL) {
          item.priority = 1.0;
          item.lastmod = DateTime.now().toISO();
        }

        if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          const postFile = path.resolve('./', 'src/pages', `${trimSlash(new URL(item.url).pathname)}.md`);
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
  trailingSlash: 'always',
};

export default defineConfig(config);
