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
        <div className="mx-auto hidden w-full max-w-[37%] items-end justify-between pt-48 pb-4 md:flex">
          <h1 className="font-heading text-grass text-center text-5xl tracking-tighter">
            Gallery
          </h1>
          <SEGButton />
        </div>
        <h1 className="font-heading text-grass pt-16 pb-8 text-center text-3xl tracking-tighter md:hidden">
          Gallery
        </h1>
        <GallerySlider gallery={gallery} />
        <p className="font-body text-abyss mx-auto hidden max-w-[25%] -translate-x-[18%] pt-4 pb-48 italic md:block">
          The memories of our past events live in our gallery for future
          generations and club members to see and admire.
        </p>
        <div className="flex justify-center pt-8 pb-16 md:hidden">
          <SEGButton />
        </div>
      </div>
    </div>
  )
}
