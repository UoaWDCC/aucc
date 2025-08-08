import { CollectionConfig, ValidationError } from 'payload'

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
    beforeChange: [
      ({ data, operation }) => {
        if (!data.image && (!data.images || data.images.length === 0)) {
          throw new ValidationError({
            errors: [
              {
                message: 'At least one image must be provided.',
                path: operation == 'update' ? 'image' : 'images',
              },
            ],
          })
        }
      },
    ],
    afterChange: [
      ({ doc, req }) => {
        if (doc['images'] && doc['images'].length > 0 && req.payload) {
          doc['images'].slice(1).forEach((item: any) => {
            req.payload.create({
              collection: 'gallery',
              data: {
                image: item,
                images: [],
                tags: doc.tags,
              },
            })
          })

          req.payload.update({
            collection: 'gallery',
            id: doc.id,
            data: {
              image: doc.images[0],
              images: [],
              tags: doc.tags,
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
      required: false,
      mimeType: 'image',
      admin: {
        thumbnail: true,
        className: 'hide-filename',
      },
      access: {
        create: () => false,
        read: ({ id }) => {
          if (id) {
            return true
          }
          return false
        },
      },
    }),
    customUploadField({
      name: 'images',
      label: 'Images',
      required: false,
      mimeType: 'image',
      admin: {
        thumbnail: true,
        className: 'hide-filename',
      },
      access: {
        read: ({ id }) => {
          if (id) {
            return false
          }
          return true
        },
        update: () => false,
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
