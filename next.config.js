/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const withVideos = require('next-videos')
const withPlugins = require('next-compose-plugins');
const nextConfig = withPlugins([withVideos], {
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
  }),
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // allow any image
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ['res.cloudinary.com'],
  },
})

module.exports = nextConfig;