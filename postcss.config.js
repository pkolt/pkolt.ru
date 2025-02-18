/** @type {import('@csstools/postcss-global-data').pluginOptions} */
const globalDataOptions = {
  files: ['./src/styles/media-queries.css'],
};

/** @type {import('@csstools/postcss-oklab-function').pluginOptions} */
const oklabFuncOptions = {
  preserve: true,
};

/** @type {import('postcss-preset-env').pluginOptions} */
const presentEnvOptions = {
  // debug: true,
  // browsers: '> 0.2% and not dead',
  // minimumVendorImplementations: 2,
  stage: false, // Disable all features
  features: {
    'nesting-rules': true,
    'custom-media-queries': true,
  },
};

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@csstools/postcss-global-data': globalDataOptions,
    '@csstools/postcss-oklab-function': oklabFuncOptions,
    'postcss-preset-env': presentEnvOptions,
  },
};

export default config;
