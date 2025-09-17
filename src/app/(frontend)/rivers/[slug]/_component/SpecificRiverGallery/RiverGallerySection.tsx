import { getRiverGallerySimple } from '@/queries/river-gallery'
import { RiverGalleryGrid } from './RiverGalleryGrid'

export async function RiverGallerySection({ slug }: { slug: string }) {
  const items = await getRiverGallerySimple(slug, 40)
  if (!items.length) return null
  return (
    <div className="flex flex-col items-center">
      <RiverGalleryGrid items={items} />
    </div>
  )
}
