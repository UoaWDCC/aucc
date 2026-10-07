import type { CollectionConfig, FieldAccess } from 'payload'
import { APIError } from 'payload'

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
      'approvedToShare',
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
    afterChange: [() => cacheTags.swims.revalidate()],
    afterDelete: [() => cacheTags.swims.revalidate()],

    // Simple server-side spam protection: if the honeypot field
    // (named `honeypot`) contains any value on create/update,
    // this hook throws to prevent the document being saved.
    // Rationale: real users won't see the hidden honeypot input,
    // while bots filling all inputs will trigger rejection.
    beforeChange: [
      ({ data }) => {
        if (data?.honeypot && String(data.honeypot).trim().length > 0) {
          throw new APIError('Submission rejected', 400)
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
        description:
          'Honeypot field for spam protection. Hidden in admin and not stored.',
        hidden: true,
      },
      // Do not store honeypot value in the DB
      virtual: true,
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
