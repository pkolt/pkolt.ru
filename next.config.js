const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  webpack(config) {
    // Support SVG (aviable )
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  output: 'export',
  images: {
    // Error: Image Optimization using the default loader is not compatible with `{ output: 'export' }`.
    unoptimized: true,
  }
};

module.exports = withBundleAnalyzer(nextConfig);
