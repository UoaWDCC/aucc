import type { CollectionConfig } from 'payload'

import { cacheTags } from '@/lib/utils/revalidation'
import { anyone } from './_access/anyone'
import { authenticated } from './_access/authenticated'

export const VideoHighlights: CollectionConfig = {
  slug: 'video-highlights',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'url', 'createdAt'],
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [() => cacheTags.videoHighlights.revalidate()],
    afterDelete: [() => cacheTags.videoHighlights.revalidate()],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      admin: {
        description: 'Enter video title',
      },
    },
    {
      name: 'url',
      label: 'Video URL',
      type: 'text',
      required: true,
      admin: {
        description: 'YouTube or Vimeo URL.',
      },
    },
  ],
}
