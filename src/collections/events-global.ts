import type { GlobalConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'
import { customUploadField } from './_fields/custom-upload'

export const EventsGlobal: GlobalConfig = {
  slug: 'events-global',
  label: 'Main events page',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.eventsGlobal.revalidate()],
  },
  fields: [
    customUploadField({
      name: 'featuredImage',
      label: 'Featured Image',
      required: true,
      mimeType: 'image',
      admin: { thumbnail: true, className: 'hide-filename' },
    }),
    {
      name: 'petrolCosts',
      type: 'richText',
      label: 'Petrol Costs Details',
      required: true,
    },
  ],
}
