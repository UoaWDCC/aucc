import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

const affectedPaths = ['/events', '/about', '/rivers', '/trip-reports']

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [
      () => {
        affectedPaths.forEach((path) => {
          revalidatePath(path)
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
