import type { Media } from '@/payload-types'
import { getGallery } from '@/queries/gallery'
import { GalleryGrid } from './gallery-images/GalleryGrid'
import { NoImages } from './gallery-images/GalleryImage'

export async function ImagesFromPayload() {
  const { gallery, hasNextPage } = await getGallery({ limit: 12 })

  const images = gallery
    .filter(
      (doc): doc is typeof doc & { image: Media } =>
        typeof doc.image !== 'number' && doc.image != null,
    )
    .map((doc) => ({
      src: doc.image.url ?? '',
      alt: doc.image.alt ?? '',
    }))

  if (images.length === 0) {
    return <NoImages />
  }

  return <GalleryGrid initialImages={images} initialHasMore={hasNextPage} />
}
