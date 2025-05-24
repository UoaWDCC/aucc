import type { CollectionConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.media.revalidate()],
    afterDelete: [() => cacheTags.media.revalidate()],
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
