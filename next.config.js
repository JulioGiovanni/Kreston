/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/index/dashboard',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
