import { CollectionConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'
import { customUploadField } from './_fields/custom-upload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    defaultColumns: ['image', 'tags'],
    // components: {
    //   afterListTable: ['/collections/components/CustomUploadButton'],
    // },
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        if (doc['image'].length > 1) {
          if (req.payload) {
            doc['image'].slice(1).forEach((item: any) => {
              req.payload.create({
                collection: 'gallery',
                data: {
                  image: item,
                  tags: doc.tags,
                },
              })
            })
          }
          req.payload.update({
            collection: 'gallery',
            id: doc.id,
            data: {
              image: doc['image'][0],
            },
          })
        }
        cacheTags.gallery.revalidate()
      },
    ],
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
      hasMany: true,
    }),
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
}
