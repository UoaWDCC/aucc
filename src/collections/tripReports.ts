import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const TripReports: CollectionConfig = {
  slug: 'trip-reports',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Trip Name',
    },
    {
      name: 'tripDate',
      type: 'date',
      label: 'Trip Date',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Trip Description',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Trip Location',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Trip Image',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      label: 'Author',
      required: true,
    },
  ],
  timestamps: true,
}
