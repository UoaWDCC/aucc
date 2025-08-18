import Image from 'next/image'

// Temp image
import image from '@/assets/looking-for-us-02.webp'

interface EventsHeaderImageProps {
  alt: string
}

export function EventsHeaderImage({ alt }: EventsHeaderImageProps) {
  return (
    <div className="absolute inset-0 size-full overflow-hidden select-none">
      <Image src={image} alt={alt} fill className="object-cover" />
      <div className="absolute inset-0 z-1 size-full bg-gradient-to-t from-[#26342c] from-10% to-[#90A1A5]/0 opacity-80 brightness-90" />
    </div>
  )
}
