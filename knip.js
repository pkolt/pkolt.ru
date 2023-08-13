/** @type {import('knip').KnipConfig} */
const config = {
  entry: ['src/**/*.{ts,tsx,astro,md,mdx}', 'astro.config.mjs', 'postcss.config.cjs'],
  ignore: [],
  ignoreDependencies: [
    '@fontsource-variable/jetbrains-mono',
    '@fontsource-variable/open-sans',
    '@typescript-eslint/eslint-plugin',
    'astro-eslint-parser',
  ],
};

export default config;
