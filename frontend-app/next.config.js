/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
  // deviceSizes: [320, 420, 768, 1024, 1200],
  // loader: "default",
  // domains: ["res.cloudinary.com"],
};

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['*', 'localhost', 'http://localhost:1337']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/shops',
        permanent: true
      }
    ];
  }
};

// module.exports = nextConfig;
