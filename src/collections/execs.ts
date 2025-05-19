import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { customUploadField } from './_fields/custom-upload'

const affectedPaths = ['/about']
const url = process.env.SERVER_URL || 'http://localhost:3000'
const apikey = process.env.API_KEY as string

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
    afterOperation: [
      () => {
        affectedPaths.map((path) => {
          try {
            fetch(`${url}/api/webhook/revalidate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                apikey: apikey,
              },
              body: JSON.stringify({ path }),
            })
          } catch (error) {
            console.warn(error)
          }
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
