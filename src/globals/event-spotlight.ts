import type { GlobalConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from '../collections/_access/anyone'
import { authenticated } from '../collections/_access/authenticated'
import { customUploadField } from '../collections/_fields/custom-upload'

export const EventSpotlight: GlobalConfig = {
  slug: 'event-spotlight',
  label: 'Event Spotlight',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    description:
      'Featured image and caption shown on the event spotlight section.',
  },
  hooks: {
    afterChange: [() => cacheTags.eventSpotlight.revalidate()],
  },
  fields: [
    customUploadField({
      name: 'spotlightImage',
      label: 'Spotlight Image',
      required: true,
      mimeType: 'image',
      admin: { thumbnail: true, className: 'hide-filename' },
    }),
    {
      name: 'eventLabel',
      type: 'text',
      required: false,
      label: 'Event Label',
      admin: {
        description: 'Caption or label displayed beneath the image',
      },
    },
  ],
}
