import type { GlobalConfig } from 'payload'

import { anyone } from '@/collections/_access/anyone'
import { authenticated } from '@/collections/_access/authenticated'
import { customUploadField } from '@/collections/_fields/custom-upload'
import { cacheTags } from '@/lib/utils/revalidation'

export const MerchContent: GlobalConfig = {
  slug: 'merch-content',
  label: 'Merch Product Sections',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.merchContent.revalidate()],
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Product Sections',
      admin: {
        description:
          'Each section becomes one product group on the merch page (e.g. T-Shirts, Stickers, Board Shorts).',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Section Description',
          admin: {
            description: 'Short blurb shown under the section title.',
          },
        },
        {
          name: 'products',
          type: 'array',
          label: 'Products',
          fields: [
            {
              name: 'productName',
              type: 'text',
              label: 'Product Name',
              required: true,
            },
            {
              name: 'price',
              type: 'text',
              label: 'Price',
              admin: {
                description:
                  'e.g. "$35" — shown as plain text, not calculated.',
              },
            },
            customUploadField({
              name: 'image',
              label: 'Product Image',
              mimeType: 'image',
              admin: { thumbnail: true, className: 'hide-filename' },
            }),
          ],
        },
      ],
    },
  ],
}
