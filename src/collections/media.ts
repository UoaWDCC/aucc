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
    imageSizes: [
      {
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75,
          },
        },
        name: 'thumbnail',
        width: 150,
        height: 150,
      },
      {
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75,
          },
        },
        name: 'small',
        width: 375,
        height: undefined,
      },
      {
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75,
          },
        },
        name: 'medium',
        width: 768,
        height: undefined,
      },
      {
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75,
          },
        },
        name: 'large',
        width: 1024,
        height: undefined,
      },
      {
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75,
          },
        },
        name: 'extraLarge',
        width: 1280,
        height: undefined,
      },
      {
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75,
          },
        },
        name: 'doubleExtraLarge',
        width: 1920,
        height: undefined,
      },
    ],
  },
}
