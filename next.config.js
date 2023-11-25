/** @type {import('next').NextConfig} */
const nextConfig = {
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
    domains: ['res.cloudinary.com']
    // typescript: {
    //   ignoreBuildErrors: true,
    // },
  },
};

module.exports = nextConfig;