import type { CollectionConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'

export const ALT_TEXT_REQUIRED_MESSAGE =
  'Add alt text that describes the image.'

export function validateAltText(value: unknown): true | string {
  return typeof value === 'string' && value.trim().length > 0
    ? true
    : ALT_TEXT_REQUIRED_MESSAGE
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Photos & Videos',
  },
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
      admin: {
        description:
          'Describe the image for people who use screen readers, e.g. "Paddler running a rapid on the Kaituna".',
      },
      // Required through validation rather than `required: true`, which would
      // make the column NOT NULL and fail to migrate while older images have
      // no alt text. Older images must be given alt text the next time they
      // are edited.
      validate: validateAltText,
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
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
