import { flushAllTraces } from 'next/dist/trace'
import { CollectionConfig, ValidationError } from 'payload'

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
    beforeChange: [
      ({ data, operation }) => {
        if (operation == 'create' && data.images && data.images.length > 0) {
          data.image = data.images[0]
        }
        if (!data.image) {
          throw new ValidationError({
            errors: [
              {
                message: 'At least one image must be provided.',
                path: 'images',
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
              image: doc.image,
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
        condition: (data: any) => {
          if (data && data.image) {
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
        condition: (data: any) => {
          if (data && data.image) {
            return false
          }
          return true
        },
        description:
          'Allows bulk upload, the tag will be applied to all images.',
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
