import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { cacheTags } from '@/lib/utils/revalidation'
import { customUploadField } from './_fields/custom-upload'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.events.revalidate()],
    afterDelete: [() => cacheTags.events.revalidate()],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'startTime',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      required: true,
    },
    {
      name: 'endTime',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    customUploadField({
      name: 'featuredImage',
      mimeType: 'image',
    }),
  ],
}
