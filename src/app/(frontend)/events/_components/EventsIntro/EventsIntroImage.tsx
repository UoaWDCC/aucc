// src/app/(frontend)/events/_components/EventsIntro/EventsIntroImage.tsx
import Image, { type StaticImageData } from 'next/image'

// Fallback image
import fallbackImage from '@/assets/looking-for-us-02.webp'

interface EventsIntroImageProps {
  alt: string
  /** Use fall back if there is no global image**/
  src?: string | StaticImageData
}

export function EventsIntroImage({ alt, src }: EventsIntroImageProps) {
  const bg = src ?? fallbackImage

  return (
    <div className="absolute inset-0 size-full overflow-hidden select-none">
      <Image src={bg} alt={alt} fill className="object-cover" />
      <div className="absolute inset-0 z-1 size-full bg-gradient-to-t from-[#26342c] from-10% to-[#90A1A5]/0 opacity-80 brightness-90" />
    </div>
  )
}
