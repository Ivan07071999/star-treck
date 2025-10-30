/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  experimental: {
    i18n: {
      locales: ['en', 'ru'],
      defaultLocale: 'en',
    },
  },
};

export default nextConfig;
