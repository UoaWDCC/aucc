import type { Media } from '@/payload-types'
import { getGallery } from '@/queries/gallery'
import { GalleryGrid } from './gallery-images/GalleryGrid'
import { NoImages } from './gallery-images/GalleryImage'

export async function ImagesFromPayload() {
  const { gallery, hasNextPage } = await getGallery()

  const images = gallery
    .filter(
      (doc): doc is typeof doc & { image: Media } =>
        typeof doc.image !== 'number' && doc.image != null,
    )
    .map((doc, index) => ({
      src: doc.image.url ?? '',
      alt: doc.image.alt ?? '',
      // TEMP: fake varied tags to test filtering — REVERT before committing
      tags: ['Taupo', 'Fulljames', 'Waikato River', 'Test Tag'].slice(
        0,
        (index % 4) + 1,
      ),
    }))

  if (images.length === 0) {
    return <NoImages />
  }

  return <GalleryGrid initialImages={images} initialHasMore={hasNextPage} />
}
