import { CollectionConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'
import { customUploadField } from './_fields/custom-upload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    defaultColumns: ['image', 'tags'],
  },
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
    customUploadField({
      name: 'image',
      label: 'Image',
      required: true,
      mimeType: 'image',
      admin: {
        thumbnail: true,
        className: 'hide-filename',
      },
    }),
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
}
