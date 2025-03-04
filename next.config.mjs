import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@t3-oss/env-nextjs'],
}

export default withPayload(nextConfig)
