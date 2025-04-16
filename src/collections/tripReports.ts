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
    // TODO(@Troyabbs): uncomment this to switch this on when the exec collection is ready #issue 16
    // {
    //   name: 'author',
    //   type: 'relationship',
    //   required: true,
    //   hasMany: true,
    //   relationTo: 'execs',
    // },
    {
      name: 'tripDate',
      type: 'date',
      label: 'Trip Date',
    },
    // TODO(@f13322): uncomment this to switch this on when the event collection is ready #issue 34
    // {
    //   name: 'relatedEvent',
    //   type: 'relationship',
    //   relationTo: 'events',
    //   required: false,
    //   label: 'Related Event',
    // },
    {
      name: 'relatedRiver',
      type: 'relationship',
      required: false,
      relationTo: 'rivers',
      label: 'Related River',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Trip Description',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Trip Location',
    },
    {
      name: 'gallery',
      type: 'relationship',
      hasMany: true,
      relationTo: 'media',
      label: 'Trip Gallery',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      label: 'Slug',
    },
  ],
}
