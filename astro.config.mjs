import { defineConfig, sharpImageService } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkYoutube from 'remark-youtube';

/** @type {import('astro/config').AstroUserConfig} */
const config = {
  site: 'https://pkolt.ru',
  integrations: [react(), sitemap(), mdx()],
  compressHTML: true,
  markdown: {
    remarkPlugins: [remarkYoutube],
    gfm: true,
    syntaxHighlight: 'prism',
  },
  outDir: 'out',
  cacheDir: 'cache',
  experimental: {
    assets: true,
  },
  image: {
    service: sharpImageService(),
  },
};

export default defineConfig(config);
