import type { NextConfig } from 'next'
import path from 'path'

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
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  webpack(config, { dev }) {
    if (dev) {
      // Beperk file watching tot de projectmap — voorkomt dat Next.js de
      // volledige C:\ root scant en EINVAL-fouten krijgt op Windows systeembestanden.
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules|\.next|DumpStack|pagefile\.sys|swapfile\.sys|hiberfil\.sys|System Volume Information/,
      }
    }
    return config
  },
}

export default nextConfig
