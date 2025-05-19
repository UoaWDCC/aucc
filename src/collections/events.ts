import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { customUploadField } from './_fields/custom-upload'

const affectedPaths = ['/events']
const url = process.env.SERVER_URL || 'http://localhost:3000'
const apikey = process.env.API_KEY as string

export const Events: CollectionConfig = {
  slug: 'events',
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
