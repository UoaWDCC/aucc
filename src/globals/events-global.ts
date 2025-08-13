import type { GlobalConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from '../collections/_access/anyone'
import { authenticated } from '../collections/_access/authenticated'
import { customUploadField } from '../collections/_fields/custom-upload'

export const EventsGlobal: GlobalConfig = {
  slug: 'events-global',
  label: 'Events Page',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.eventsGlobal.revalidate()],
  },
  fields: [
    customUploadField({
      name: 'headerImage',
      label: 'Header Image',
      required: true,
      mimeType: 'image',
      admin: { thumbnail: true, className: 'hide-filename' },
    }),
    {
      name: 'petrolCosts',
      type: 'richText',
      label: 'Petrol Costs Information',
      required: true,
    },
    {
      name: 'introText',
      type: 'richText',
      label: 'Intro Text',
      required: true,
    },
  ],
}
