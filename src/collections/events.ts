import type { CollectionConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'
import { customUploadField } from './_fields/custom-upload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'featuredImage',
      'title',
      'status',
      'startTime',
      'endTime',
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
      ({ data }) => {
        if (data.eventType !== 'trip') {
          data.river = null
        }
        return data
      },
    ],
    afterChange: [() => cacheTags.events.revalidate()],
    afterDelete: [() => cacheTags.events.revalidate()],
  },
  fields: [
    // TODO: Add sign-up form and river relation for grade
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
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'ticketsInformation',
      type: 'richText',
    },
    {
      name: 'eventType',
      type: 'select',
      label: 'Event Type',
      required: true,
      options: [
        { label: 'Trip', value: 'trip' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'other',
    },
    {
      name: 'river',
      type: 'relationship',
      relationTo: 'rivers',
      required: true,
      admin: {
        condition: (data) => data?.eventType === 'trip',
      },
    },
    customUploadField({
      name: 'featuredImage',
      label: 'Featured Image',
      required: true,
      mimeType: 'image',
      admin: {
        className: 'hide-filename',
      },
    }),
  ],
}
