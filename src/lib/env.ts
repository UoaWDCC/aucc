import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    PAYLOAD_SECRET: z.string().min(1),
    SERVER_URL: z.string().url(),
    S3_BUCKET: z.string().min(1),
    S3_ACCESS_KEY_ID: z.string().min(1),
    S3_SECRET_ACCESS_KEY: z.string().min(1),
    S3_REGION: z.string().min(1),
    // S3_CF_PUBLIC_ENDPOINT: z.string().min(1),
    API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CF_URL: z.string().min(1),
  },
  // this can be used in Next.js^13.4.4 and above,
  // client side runtime environment variables still need to be manually destructured
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CF_URL: process.env.NEXT_PUBLIC_CF_URL,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
})
