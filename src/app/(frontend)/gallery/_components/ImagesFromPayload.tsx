import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'
import { GalleryGrid } from './gallery-images/GalleryGrid'
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
    .map((doc) => ({
      src: doc.image.url ?? '',
      alt: doc.image.alt ?? '',
    }))
  if (images.length === 0) {
    return <NoImages />
  }
  return <GalleryGrid images={images} />
}
