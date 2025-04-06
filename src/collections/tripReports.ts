import type { CollectionConfig } from 'payload'

export const TripReports: CollectionConfig = {
  slug: 'trip-reports',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
        name: 'title',
        type: 'text',
        required: true,

    },
    {
        name: 'datePublished',
        type: 'date',
        required: true,
    },
    {
        name: 'thumbnail',
        type: 'upload',
        relationTo: 'media',
        required: true,
    },
],
};