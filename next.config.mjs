import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Default to regular build outputs for local development, and standalone for dockerized builds
  output: process.env.STANDALONE_OUTPUT === 'true' ? 'standalone' : undefined,
  transpilePackages: ['@t3-oss/env-nextjs'],
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CF_URL
          ? new URL(process.env.NEXT_PUBLIC_CF_URL).hostname
          : '*.cloudfront.net',
      },
    ],
  },
}

export default withPayload(nextConfig)
