import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
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
