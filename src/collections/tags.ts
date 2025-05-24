import { CollectionConfig } from 'payload'

import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
