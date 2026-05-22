import type { GlobalConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from '../collections/_access/anyone'
import { authenticated } from '../collections/_access/authenticated'
import { customUploadField } from '../collections/_fields/custom-upload'

export const GalleryGlobal: GlobalConfig = {
  slug: 'gallery-global',
  label: 'Gallery Page',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.galleryGlobal.revalidate()],
  },
  fields: [
    customUploadField({
      name: 'headerImage',
      label: 'Header Image',
      required: true,
      mimeType: 'image',
      admin: { thumbnail: true, className: 'hide-filename' },
    }),
    {
      name: 'videoHighlights',
      type: 'array',
      label: 'Video Highlights',
      maxRows: 3,
      labels: { singular: 'Video', plural: 'Videos' },
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'Embed URL',
          required: true,
          admin: {
            description: 'Embed URL',
          },
        },
      ],
    },
  ],
}
