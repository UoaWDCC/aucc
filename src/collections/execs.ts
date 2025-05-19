import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { customUploadField } from './_fields/custom-upload'

const affectedPaths = ['/about']

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
  hooks: {
    afterChange: [
      () => {
        affectedPaths.forEach((path) => {
          revalidatePath(path)
        })
      },
    ],
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
    }),
  ],
}
