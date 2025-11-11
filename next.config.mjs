/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  experimental: {
    i18n: {
      locales: ['en', 'ru'],
      defaultLocale: 'en',
    },
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
