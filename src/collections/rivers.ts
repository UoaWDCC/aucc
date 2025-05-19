import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { customUploadField } from './_fields/custom-upload'

const affectedPaths = ['/rivers']
const url = process.env.SERVER_URL || 'http://localhost:3000'
const apikey = process.env.API_KEY as string

export const Rivers: CollectionConfig = {
  slug: 'rivers',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data.name && data.name !== originalDoc?.name) {
          data.slug = slugify(data.name, {
            lower: true,
            strict: true,
          })
        }
        return data
      },
    ],
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
      name: 'name',
      type: 'text',
    },
    {
      name: 'grade',
      type: 'number',
    },
    {
      name: 'description',
      type: 'text',
    },
    customUploadField({
      name: 'image',
      mimeType: 'image',
    }),
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      label: 'Slug',
      admin: {
        readOnly: true,
        description: 'Automatically generated from name',
        hidden: true,
      },
    },
  ],
}
