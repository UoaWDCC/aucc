import { PayloadImage } from '@/components/PayloadImage'
import { Media } from '@/payload-types'

type EventsHeaderImageProps = {
  media: Media
}

export function EventsHeaderImage({ media }: EventsHeaderImageProps) {
  return (
    <div className="absolute inset-0 size-full overflow-hidden select-none">
      <PayloadImage media={media} className="object-cover" />
      <div className="absolute inset-0 z-1 size-full bg-gradient-to-t from-[#26342c] from-10% to-[#90A1A5]/0 opacity-80 brightness-90" />
    </div>
  )
}
