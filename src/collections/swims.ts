import type { CollectionConfig } from 'payload'

import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'
import { customUploadField } from './_fields/custom-upload'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
    ],
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    // Simple server-side spam protection: if the honeypot field
    // (named `honeypot`) contains any value on create/update,
    // this hook throws to prevent the document being saved.
    // Rationale: real users won't see the hidden honeypot input,
    // while bots filling all inputs will trigger rejection.
    beforeChange: [
      ({ data }) => {
        if (data?.honeypot && String(data.honeypot).trim().length > 0) {
          throw new Error('Spam detected')
        }
        return data
      },
    ],
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
    // Honeypot field used for spam protection.
    // Public/embedded forms should include an input named `honeypot`
    // that is hidden via CSS (e.g. `display:none` or visually-hidden).
    // If a client fills this field the submission will be rejected
    // server-side by the `beforeChange` hook above.
    {
      name: 'honeypot',
      type: 'text',
      admin: {
        // Keep visible in admin for debugging but optional to hide.
        description:
          'Honeypot field for spam protection. Do not expose to real users.',
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
  ],
}
