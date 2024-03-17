/** @type {import('knip').KnipConfig} */
const config = {
  entry: ['src/**/*.{ts,tsx,astro,md,mdx}', 'astro.config.mjs', 'postcss.config.cjs'],
  ignore: [],
  ignoreDependencies: ['@typescript-eslint/eslint-plugin', 'sharp'],
};

export default config;
