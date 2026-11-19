import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@t3-oss/env-nextjs'],
  experimental: {
    // The public site and the Payload admin are separate root layouts, so
    // unmatched URLs use app/global-not-found.tsx.
    globalNotFound: true,
  },
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
