import { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tag',
      type: 'relationship',
      relationTo: 'image-tags',
      hasMany: true,
    },
  ],
}
