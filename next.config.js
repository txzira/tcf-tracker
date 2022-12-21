/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
