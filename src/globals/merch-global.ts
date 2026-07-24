import type { GlobalConfig } from 'payload'

import { anyone } from '@/collections/_access/anyone'
import { authenticated } from '@/collections/_access/authenticated'
import { customUploadField } from '@/collections/_fields/custom-upload'
import { cacheTags } from '@/lib/utils/revalidation'

export const MerchGlobal: GlobalConfig = {
  slug: 'merch-global',
  label: 'Merch Page',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.merchGlobal.revalidate()],
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Merch Items',
      required: true,
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          required: true,
        },
        {
          name: 'body',
          type: 'richText',
          label: 'Body Text',
        },
        customUploadField({
          name: 'image',
          label: 'Image',
          required: true,
          mimeType: 'image',
          admin: { thumbnail: true, className: 'hide-filename' },
        }),
        {
          name: 'variant',
          type: 'select',
          label: 'Layout Variant',
          required: true,
          options: [
            {
              label: 'Image Left (heading top-left, full-width image)',
              value: 'image-left',
            },
            {
              label: 'Image Right (text left, image right)',
              value: 'image-right',
            },
            {
              label: 'Image with Caption (heading above, full image)',
              value: 'image-with-caption',
            },
          ],
        },
        {
          name: 'calloutLabels',
          type: 'array',
          label: 'Callout Labels (overlay on image)',
          admin: {
            description:
              'Optional labels overlaid on the image, e.g. for Towel Poncho variant',
            condition: (_, siblingData) =>
              siblingData?.variant === 'image-with-caption',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
