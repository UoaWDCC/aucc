import type { GlobalConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from '../collections/_access/anyone'
import { authenticated } from '../collections/_access/authenticated'

export const Merch: GlobalConfig = {
  slug: 'merch',
  label: 'Merch Page',

  access: {
    read: anyone,
    update: authenticated,
  },

  hooks: {
    afterChange: [() => cacheTags.galleryGlobal.revalidate()],
  },

  fields: [
    {
      name: 'sections',
      type: 'array',
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },

        {
          name: 'description',
          type: 'textarea',
        },

        {
          name: 'products',
          type: 'array',
          labels: {
            singular: 'Product',
            plural: 'Products',
          },
          fields: [
            {
              name: 'productName',
              type: 'text',
              required: true,
            },

            {
              name: 'price',
              type: 'text',
            },

            {
              name: 'image',
              label: 'Product Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
