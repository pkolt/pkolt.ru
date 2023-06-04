/** @type {import('@csstools/postcss-global-data').pluginOptions} */
const globalDataOptions = {
  files: [
    './src/styles/media-queries.css',
  ],
};

/** @type {import('postcss-preset-env').pluginOptions} */
const presentEnvOptions = {
  // debug: true,
};

const config = {
  plugins: [
    ['@csstools/postcss-global-data', globalDataOptions],
    ['postcss-preset-env', presentEnvOptions],
  ],
};

module.exports = config;
