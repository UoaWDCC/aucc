import type { GlobalConfig } from 'payload'

import { anyone } from '@/collections/_access/anyone'
import { authenticated } from '@/collections/_access/authenticated'
import { customUploadField } from '@/collections/_fields/custom-upload'
import { cacheTags } from '@/lib/utils/revalidation'

// Shared fields every section needs (label, heading, body, image).
// Badge is added per-section only where it applies.
function baseSectionFields(sectionLabel: string) {
  return [
    {
      name: 'label',
      type: 'text' as const,
      label: `${sectionLabel} — Label`,
      required: true,
      admin: {
        description: 'Short name shown in navigation/tabs for this section.',
      },
    },
    {
      name: 'heading',
      type: 'text' as const,
      label: `${sectionLabel} — Heading`,
      required: true,
    },
    {
      name: 'body',
      type: 'richText' as const,
      label: `${sectionLabel} — Body Text`,
    },
    customUploadField({
      name: 'image',
      label: `${sectionLabel} — Image`,
      required: true,
      mimeType: 'image',
      admin: { thumbnail: true, className: 'hide-filename' },
    }),
  ]
}

function badgeField(sectionLabel: string) {
  return {
    name: 'badge' as const,
    type: 'text' as const,
    label: `${sectionLabel} — Badge (optional)`,
    admin: {
      description: 'e.g. "New", "Limited Edition" — leave blank to hide.',
    },
  }
}

export const MerchContent: GlobalConfig = {
  slug: 'merch-content',
  label: 'Merch Product Sections',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.merchContent.revalidate()],
  },
  fields: [
    {
      name: 'tshirts',
      type: 'group',
      label: 'T-Shirts',
      admin: { description: 'Editable content for the T-Shirts section.' },
      fields: [...baseSectionFields('T-Shirts'), badgeField('T-Shirts')],
    },
    {
      name: 'stickers',
      type: 'group',
      label: 'Stickers',
      admin: { description: 'Editable content for the Stickers section.' },
      fields: [...baseSectionFields('Stickers'), badgeField('Stickers')],
    },
    {
      name: 'boardShorts',
      type: 'group',
      label: 'Board Shorts',
      admin: { description: 'Editable content for the Board Shorts section.' },
      fields: [
        ...baseSectionFields('Board Shorts'),
        badgeField('Board Shorts'),
        {
          name: 'caption',
          type: 'text',
          label: 'Board Shorts — Caption',
          admin: {
            description: 'Short caption shown under the group photo.',
          },
        },
        customUploadField({
          name: 'groupPhoto',
          label: 'Board Shorts — Group Photo',
          required: true,
          mimeType: 'image',
          admin: { thumbnail: true, className: 'hide-filename' },
        }),
      ],
    },
    {
      name: 'towelPoncho',
      type: 'group',
      label: 'Towel Poncho',
      admin: { description: 'Editable content for the Towel Poncho section.' },
      fields: [
        ...baseSectionFields('Towel Poncho'),
        badgeField('Towel Poncho'),
        {
          name: 'annotations',
          type: 'array',
          label: 'Towel Poncho — Image Annotations',
          admin: {
            description:
              'Text labels positioned over the image (e.g. pointing to features). "Top %" controls vertical placement — 0 is the top edge of the image, 100 is the bottom edge.',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Annotation Text',
              required: true,
            },
            {
              name: 'topPercent',
              type: 'number',
              label: 'Vertical Position (0–100%)',
              required: true,
              min: 0,
              max: 100,
              admin: {
                description:
                  '0 = top of image, 100 = bottom of image, 50 = middle.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'sweatshirt',
      type: 'group',
      label: 'Sweatshirt',
      admin: { description: 'Editable content for the Sweatshirt section.' },
      fields: [
        ...baseSectionFields('Sweatshirt'),
        badgeField('Sweatshirt'),
        {
          name: 'yearLabel',
          type: 'text',
          label: 'Sweatshirt — Year Label',
          admin: {
            description: 'e.g. "2026 Edition" — shown alongside the heading.',
          },
        },
        customUploadField({
          name: 'imageLeft',
          label: 'Sweatshirt — Left Image',
          required: true,
          mimeType: 'image',
          admin: { thumbnail: true, className: 'hide-filename' },
        }),
        customUploadField({
          name: 'imageRight',
          label: 'Sweatshirt — Right Image',
          required: true,
          mimeType: 'image',
          admin: { thumbnail: true, className: 'hide-filename' },
        }),
      ],
    },
  ],
}
