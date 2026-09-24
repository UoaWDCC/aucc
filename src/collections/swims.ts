import type { CollectionConfig, FieldAccess } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'
import { customUploadField } from './_fields/custom-upload'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const adminOnly: FieldAccess = ({ req: { user } }) => Boolean(user)

export const Swims: CollectionConfig = {
  slug: 'swims',
  admin: {
    useAsTitle: 'tripName',
    defaultColumns: [
      'date',
      'tripName',
      'river',
      'memberName',
      'email',
      'image',
      'approvedToShare',
    ],
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.swims.revalidate()],
    afterDelete: [() => cacheTags.swims.revalidate()],
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'tripName',
      type: 'text',
      required: true,
    },
    {
      name: 'river',
      type: 'relationship',
      relationTo: 'rivers',
      required: true,
    },
    {
      name: 'memberName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !emailPattern.test(value)) {
          return 'Please enter a valid email address.'
        }

        return true
      },
    },
    customUploadField({
      name: 'image',
      label: 'Image',
      mimeType: 'image',
      admin: {
        thumbnail: true,
        className: 'hide-filename',
      },
    }),
    {
      name: 'approvedToShare',
      type: 'checkbox',
      label: 'Approved to share',
      defaultValue: false,
      index: true,
      access: {
        create: adminOnly,
        update: adminOnly,
      },
      admin: {
        position: 'sidebar',
        description:
          'Tick to publish this photo on the website. Submissions will stay hidden until an admin approves them.',
      },
    },
  ],
}
