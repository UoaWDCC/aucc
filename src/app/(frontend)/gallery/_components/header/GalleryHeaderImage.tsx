import { PayloadImage } from '@/components/PayloadImage'
import { Media } from '@/payload-types'

type GalleryHeaderImageProps = {
  media: Media | null | undefined
}

export function GalleryHeaderImage({ media }: GalleryHeaderImageProps) {
  return (
    <div className="absolute inset-0 size-full overflow-hidden select-none">
      <PayloadImage media={media ?? undefined} className="object-cover" />
      <div className="absolute inset-0 z-1 size-full bg-gradient-to-t from-[#1E2A29] from-10% to-[#90A1A5]/0 opacity-80 brightness-90" />
    </div>
  )
}
