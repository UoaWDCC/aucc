import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'
import { customUploadField } from './_fields/custom-upload'

export const TripReports: CollectionConfig = {
  slug: 'trip-reports',
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'featuredImage',
      'title',
      'status',
      'tripDate',
      'location',
    ],
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
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Trip Location',
      required: true,
    },
    {
      name: 'relatedEvent',
      type: 'relationship',
      relationTo: 'events',
      required: true,
      label: 'Related Event',
    },
    {
      name: 'relatedRiver',
      type: 'relationship',
      required: true,
      relationTo: 'rivers',
      label: 'Related River',
    },
    customUploadField({
      name: 'featuredImage',
      label: 'Featured Image',
      required: true,
      mimeType: 'image',
      admin: {
        thumbnail: true,
      },
    }),
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
    },
    customUploadField({
      name: 'gallery',
      label: 'Trip Gallery',
      hasMany: true,
      required: false,
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
  ],
}
