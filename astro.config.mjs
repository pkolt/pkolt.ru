import { defineConfig, sharpImageService } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkYoutube from 'remark-youtube';

// https://astro.build/config
export default defineConfig({
  site: 'https://pkolt.ru',
  integrations: [react(), sitemap(), mdx()],
  markdown: {
    remarkPlugins: [remarkYoutube],
    gfm: true,
  },
  outDir: 'out',
  experimental: {
    assets: true,
  },
  image: {
    service: sharpImageService(),
  },
});
