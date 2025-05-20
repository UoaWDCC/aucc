import path from 'path'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from '@/collections/media'
import { Users } from '@/collections/users'
import { env } from '@/lib/env'
import { Events } from './collections/events'
import { Execs } from './collections/execs'
import { Gallery } from './collections/gallery'
import { Rivers } from './collections/rivers'
import { Tags } from './collections/tags'
import { TripReports } from './collections/trip-reports'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Rivers,
    Events,
    TripReports,
    Execs,
    Gallery,
    Tags,
  ],
  editor: lexicalEditor({}),
  serverURL: env.SERVER_URL,
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
          disableLocalStorage: true,
          generateFileURL: ({
            filename,
            prefix,
          }: {
            filename: string
            prefix?: string
          }) => {
            return `${env.S3_CF_PUBLIC_ENDPOINT}/${path.posix.join(prefix || '', filename || '')}`
          },
        },
      },
      bucket: env.S3_BUCKET,
      config: {
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY_ID,
          secretAccessKey: env.S3_SECRET_ACCESS_KEY,
        },
        region: env.S3_REGION,
      },
    }),
  ],
})
