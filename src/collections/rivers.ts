import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'
import { customUploadField } from './_fields/custom-upload'

export const Rivers: CollectionConfig = {
  slug: 'rivers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['featuredImage', 'name', 'grade', 'description'],
  },
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
    afterChange: [() => cacheTags.rivers.revalidate()],
    afterDelete: [() => cacheTags.rivers.revalidate()],
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
      name: 'putIn',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: true,
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'takeOut',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: true,
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'text',
    },
    customUploadField({
      name: 'featuredImage',
      mimeType: 'image',
      admin: {
        className: 'hide-filename',
      },
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
