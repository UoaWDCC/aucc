import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { cacheTags } from '@/config/revalidation'

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
    afterChange: [() => revalidateTag('execs')],
    afterDelete: [() => revalidateTag('execs')],
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
    },
  ],
}
