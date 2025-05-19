import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

const affectedPaths = ['/events', '/about', '/rivers', '/trip-reports']
const url = process.env.SERVER_URL || 'http://localhost:3000'
const apikey = process.env.API_KEY as string

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterOperation: [
      () => {
        affectedPaths.map((path) => {
          try {
            fetch(`${url}/api/webhook/revalidate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                apikey: apikey,
              },
              body: JSON.stringify({ path }),
            })
          } catch (error) {
            console.warn(error)
          }
        })
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    // TODO(dyzhuu) confirm image sizes
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        crop: 'center',
      },
      {
        name: 'small',
        width: 800,
        height: 600,
      },
      {
        name: 'medium',
        width: 1280,
        height: 720,
      },
      {
        name: 'large',
        width: 1920,
        height: 1080,
      },
    ],
  },
}
