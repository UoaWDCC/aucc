import Image from 'next/image'

import aboutHeaderImage from '@/assets/about-us-top.webp'

export function HeaderImage() {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden select-none">
      <Image
        src={aboutHeaderImage}
        alt="About Us Header"
        fill
        className="object-cover object-top"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#35483e]/60 to-[#90A1A5]/30 opacity-80 brightness-90" />
    </div>
  )
}
