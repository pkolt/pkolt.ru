import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import image from '@astrojs/image';
import remarkYoutube from 'remark-youtube';

// https://astro.build/config
export default defineConfig({
  site: 'https://pkolt.ru',
  integrations: [react(), sitemap(), mdx(), image({ serviceEntryPoint: '@astrojs/image/sharp' })],
  markdown: {
    remarkPlugins: [remarkYoutube],
    gfm: true,
  },
  outDir: 'out',
});
