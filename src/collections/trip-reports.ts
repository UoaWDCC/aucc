import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const TripReports: CollectionConfig = {
  slug: 'trip-reports',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['gallery', 'title', 'status', 'tripDate', 'location'],
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
        if (data.title && data.title !== originalDoc?.title) {
          data.slug = slugify(data.title, {
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
      name: 'gallery',
      type: 'upload',
      hasMany: true,
      relationTo: 'media',
      label: 'Trip Gallery',
      admin: {
        className: 'hide-filename',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Trip Name',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Trip Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      required: true,
      hasMany: true,
      relationTo: 'execs',
    },
    {
      name: 'tripDate',
      type: 'date',
      label: 'Trip Date',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Trip Location',
    },
    {
      name: 'relatedEvent',
      type: 'relationship',
      relationTo: 'events',
      required: false,
      label: 'Related Event',
    },
    {
      name: 'relatedRiver',
      type: 'relationship',
      required: false,
      relationTo: 'rivers',
      label: 'Related River',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      label: 'Slug',
      admin: {
        readOnly: true,
        description: 'Automatically generated from title',
        hidden: true,
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
    },
  ],
}
