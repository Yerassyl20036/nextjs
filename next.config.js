/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "inspiring-light-f216c5492b.media.strapiapp.com",
      },
    ],
  },
};

module.exports = nextConfig;
