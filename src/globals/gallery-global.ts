import type { GlobalConfig } from 'payload'

import { anyone } from '../collections/_access/anyone'
import { authenticated } from '../collections/_access/authenticated'
import { customUploadField } from '../collections/_fields/custom-upload'
import { cacheTags } from '@/lib/utils/revalidation'

export const GalleryGlobal: GlobalConfig = {
  slug: 'gallery-global',
  label: 'Gallery Page',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.galleryGlobal.revalidate()],
  },
  fields: [
    customUploadField({
      name: 'headerImage',
      label: 'Header Image',
      required: true,
      mimeType: 'image',
      admin: { thumbnail: true, className: 'hide-filename' },
    }),
  ],
}
