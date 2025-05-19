import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { createImageValidationHook } from './validateImageUpload'

export const Execs: CollectionConfig = {
  slug: 'execs',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
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
    {
      name: 'image',
      label: 'Profile Image',
      type: 'upload',
      relationTo: 'media',
      hooks: {
        beforeChange: [createImageValidationHook()],
      },
    },
  ],
}
