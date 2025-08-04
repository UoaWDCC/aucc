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
        if (doc['more-images'].length > 0) {
          if (req.payload) {
            doc['more-images'].forEach((item: any) => {
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
              'more-images': [],
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
    }),
    customUploadField({
      name: 'more-images',
      label: 'Image',
      required: false,
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
