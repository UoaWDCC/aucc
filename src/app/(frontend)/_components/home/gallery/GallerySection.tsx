import { getGallery } from '@/queries/gallery'
import { GalleryTopCurve } from './GalleryTopCurve'
import GallerySlider from './ImageSlider'
import { SEGButton } from './SEGButton'

export async function GallerySection() {
  const { gallery } = await getGallery({ limit: 10 })

  return (
    <div className="relative bg-linear-198 from-[#D4E2DA] from-30% to-[#FCF9EF]">
      <GalleryTopCurve className="max-h-40 -translate-y-px" />

      <div>
        <h1 className="font-heading text-grass pt-16 pb-8 text-center text-3xl tracking-tighter">
          Gallery
        </h1>
        <GallerySlider gallery={gallery} />

        <SEGButton />
      </div>
    </div>
  )
}
