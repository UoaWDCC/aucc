import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Default to regular build outputs for local development, and standalone for dockerized builds
  output: process.env.STANDALONE_OUTPUT === 'true' ? 'standalone' : undefined,
  transpilePackages: ['@t3-oss/env-nextjs'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.S3_CF_PUBLIC_ENDPOINT
          ? new URL(process.env.S3_CF_PUBLIC_ENDPOINT).hostname
          : '*.cloudfront.net',
      },
    ],
  },
}

export default withPayload(nextConfig)
