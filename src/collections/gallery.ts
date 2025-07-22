import { CollectionConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.gallery.revalidate()],
    afterDelete: [() => cacheTags.gallery.revalidate()],
  },
  labels: {
    singular: 'Image',
    plural: 'Gallery',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tag',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
}
