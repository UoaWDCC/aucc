import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@t3-oss/env-nextjs'],

  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
}

export default withPayload(nextConfig)
