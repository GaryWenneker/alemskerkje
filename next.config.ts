import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['clsx', 'tailwind-merge'],
  serverExternalPackages: ['@neondatabase/serverless', '@netlify/blobs'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hetalemskerkje.nl',
      },
    ],
  },
}

export default nextConfig
