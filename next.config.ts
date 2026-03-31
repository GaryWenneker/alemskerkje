import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Neon serverless driver requires this for edge runtime compatibility
  serverExternalPackages: ['@neondatabase/serverless', '@netlify/blobs'],
}

export default nextConfig
