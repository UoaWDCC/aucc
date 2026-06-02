import Image from 'next/image'

import galleryHeading from '@/assets/gallery-heading.png'

export function GalleryHeaderImage() {
  return (
    <div className="absolute inset-0 size-full overflow-hidden select-none">
      <Image
        src={galleryHeading}
        alt="Gallery header"
        fill
        className="object-cover object-top"
      />
      <div className="absolute inset-0 z-1 size-full bg-gradient-to-t from-[#26342c] from-10% to-[#90A1A5]/0 opacity-80 brightness-90" />
    </div>
  )
}
