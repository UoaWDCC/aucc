import { getRiverGallerySimple } from '@/queries/river-gallery'
import { RiverGalleryGrid } from './RiverGalleryGrid'

export async function RiverGallerySection({ slug }: { slug: string }) {
  const items = await getRiverGallerySimple(slug, 40)
  if (!items.length) return null
  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden">
      <RiverGalleryGrid items={items} seed={slug} />
    </div>
  )
}
