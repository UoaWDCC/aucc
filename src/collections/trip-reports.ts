import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { cacheTags } from '@/lib/utils/revalidation'
import { customUploadField } from './_fields/custom-upload'

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
    afterChange: [() => cacheTags.tripReports.revalidate()],
    afterDelete: [() => cacheTags.tripReports.revalidate()],
  },
  fields: [
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
    customUploadField({
      name: 'gallery',
      label: 'Trip Gallery',
      hasMany: true,
      required: true,
      mimeType: 'image',
      admin: {
        className: 'hide-filename show-first',
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
