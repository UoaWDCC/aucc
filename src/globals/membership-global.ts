import type { GlobalConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from '../collections/_access/anyone'
import { authenticated } from '../collections/_access/authenticated'
import { customUploadField } from '../collections/_fields/custom-upload'

export const MembershipGlobal: GlobalConfig = {
  slug: 'membership-global',
  label: 'Membership Page',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.membershipGlobal.revalidate()],
  },
  fields: [
    customUploadField({
      name: 'headerImage',
      label: 'Header Image',
      mimeType: 'image',
      admin: { thumbnail: true, className: 'hide-filename' },
    }),
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Membership',
    },
    {
      name: 'subheading',
      type: 'text',
      required: true,
      defaultValue: 'Join the Auckland University Canoe Club.',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Pricing intro',
      required: true,
      defaultValue: 'Pick the membership that suits you.',
    },
    {
      name: 'tiers',
      type: 'array',
      defaultValue: [
        {
          name: 'UoA/AUT students',
          price: 40,
          description: 'For current University of Auckland students',
        },
        {
          name: 'General',
          price: 60,
          description: 'For alumni, staff, and friends of the club',
        },
      ],
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'perks',
          type: 'array',
          fields: [
            {
              name: 'perk',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'benefitsIntro',
      type: 'textarea',
      label: 'Benefits intro',
      defaultValue:
        'Your membership is your ticket to the river, the pool and one of the best crews on campus.',
    },
    {
      name: 'benefitItems',
      type: 'array',
      label: 'Benefit cards',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'signupUrl',
      type: 'text',
      label: 'Signup URL',
      defaultValue: 'https://pci.jotform.com/form/260532948493870',
      admin: {
        description:
          'The membership form. Leave empty to show "Signups are closed".',
      },
    },
  ],
}
