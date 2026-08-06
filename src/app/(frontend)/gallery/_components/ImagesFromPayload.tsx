import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'
import { FilterableGalleryGrid } from './gallery-images/FilterableGalleryGrid'
import { NoImages } from './gallery-images/GalleryImage'

export async function ImagesFromPayload() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'gallery',
    depth: 1,
  })

  const images = docs
    .filter(
      (doc): doc is typeof doc & { image: Media } =>
        typeof doc.image !== 'number',
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

  return <FilterableGalleryGrid images={images} />
}
