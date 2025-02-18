/** @type {import('knip').KnipConfig} */
const config = {
  entry: ['src/**/*.{ts,tsx}', 'react-router.config.ts', 'postcss.config.js'],
  ignore: ['./public/service-worker.js', './public/service-worker-register.js'],
  ignoreDependencies: ['@react-router/node', 'isbot', 'eslint-import-resolver-typescript', 'react-router-devtools'],
};

export default config;
