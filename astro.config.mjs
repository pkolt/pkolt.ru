import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import remarkYoutube from 'remark-youtube';

// https://astro.build/config
export default defineConfig({
  site: 'https://pkolt.ru',
  integrations: [react(), sitemap()],
  markdown: {
    remarkPlugins: [remarkYoutube],
    gfm: true,
  },
  outDir: 'out',
});
