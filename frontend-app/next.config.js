/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['*', 'localhost', 'http://localhost:1337', '167.71.206.157', 'http://167.71.206.157:1337', ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 // 60 seconds - this cannot be invalidated
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true
      }
    ];
  }
};
