import type { CollectionConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'
import { customUploadField } from './_fields/custom-upload'

export const Execs: CollectionConfig = {
  slug: 'execs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['image', 'name', 'role', 'email'],
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.execs.revalidate()],
    afterDelete: [() => cacheTags.execs.revalidate()],
  },
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      name: 'pronouns',
      label: 'Pronouns',
      type: 'text',
    },
    {
      name: 'role',
      label: 'Role/Position',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
    },
    customUploadField({
      name: 'image',
      label: 'Profile Image',
      required: true,
      mimeType: 'image',
      admin: {
        className: 'hide-filename',
      },
    }),
  ],
}
