import type { GlobalConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from '../collections/_access/anyone'
import { authenticated } from '../collections/_access/authenticated'
import { customUploadField } from '../collections/_fields/custom-upload'

export const SOCIAL_PLATFORMS = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Other', value: 'other' },
] as const

const httpsUrl = (value: unknown) =>
  typeof value === 'string' && /^https:\/\/\S+$/.test(value)
    ? true
    : 'Please enter a full link starting with https://'

const siteLink = (value: unknown) =>
  typeof value === 'string' && /^(\/\S*|https:\/\/\S+)$/.test(value)
    ? true
    : 'Use a page on this site (starting with /) or a full https:// link'

/**
 * Details shown across the whole site: the footer, the About page's contact
 * and social sections, and the default image for shared links.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Website Pages',
    description:
      'Contact details, social links and footer links shown across the site.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.siteSettings.revalidate()],
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Contact',
      fields: [
        {
          name: 'contactEmail',
          type: 'email',
          label: 'Contact email',
          admin: {
            description:
              'The club’s public email. Shown in the footer and on the About page. Leave empty to hide it.',
          },
        },
        {
          name: 'contactNote',
          type: 'textarea',
          label: 'Contact note',
          defaultValue:
            'For a quicker reply to general questions, message us on Facebook.',
          admin: {
            description: 'Short text shown under the contact details.',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Postal or meeting address',
          admin: { description: 'Optional. Leave empty to hide it.' },
        },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Social media',
      labels: { singular: 'Social link', plural: 'Social links' },
      admin: {
        description:
          'Shown in the footer and on the About page, in this order.',
      },
      defaultValue: [
        {
          platform: 'instagram',
          handle: 'aucanoeclub',
          url: 'https://www.instagram.com/aucanoeclub/',
        },
        {
          platform: 'facebook',
          handle: 'AUCanoeClub',
          url: 'https://www.facebook.com/AUCanoeClub',
        },
      ],
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [...SOCIAL_PLATFORMS],
        },
        {
          name: 'handle',
          type: 'text',
          required: true,
          admin: { description: 'The name shown, e.g. aucanoeclub' },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link',
          required: true,
          validate: httpsUrl,
        },
      ],
    },
    {
      name: 'footerLinks',
      type: 'array',
      label: 'Footer links',
      admin: { description: 'Quick links in the footer, in this order.' },
      defaultValue: [
        { label: 'Events', href: '/events' },
        { label: 'Trip Reports', href: '/trip-reports' },
        { label: 'Rivers', href: '/rivers' },
        { label: 'Gear Hire', href: '/gear-hire' },
        { label: 'Resources', href: '/resources' },
        { label: 'About Us', href: '/about' },
      ],
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true, validate: siteLink },
      ],
    },
    customUploadField({
      name: 'defaultShareImage',
      label: 'Default share image',
      mimeType: 'image',
      admin: {
        description:
          'Shown when a page without its own image is shared on social media or in messages. 1200×630 works best.',
        thumbnail: true,
        className: 'hide-filename',
      },
    }),
  ],
}
