import { Media } from '@/payload-types'
import { GalleryHeaderBottomCurve } from './GalleryHeaderBottomCurve'
import { GalleryHeaderImage } from './GalleryHeaderImage'

type GalleryHeaderSectionProps = {
  headerImage: Media
}

export function GalleryHeaderSection({
  headerImage,
}: GalleryHeaderSectionProps) {
  return (
    <div className="relative flex h-60 w-full flex-col items-center justify-center align-middle md:h-115">
      <GalleryHeaderImage media={headerImage} />
      <div className="text-cream relative z-1 flex flex-col items-center md:items-start">
        <h1 className="font-heading flex justify-self-center text-center text-[60px] md:text-[100px] lg:text-[140px]">
          Gallery
        </h1>
        <h2 className="font-body -mt-4 w-60 pl-2 text-center text-xs leading-5 font-light tracking-tighter italic md:-mt-10 md:w-80 md:pl-3 md:text-start md:text-base">
          Where the memories of our past events live on for future generations
          and club members to see and admire.
        </h2>
      </div>
      <GalleryHeaderBottomCurve />
    </div>
  )
}
