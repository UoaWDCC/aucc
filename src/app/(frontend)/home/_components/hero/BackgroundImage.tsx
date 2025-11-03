import Image from 'next/image'

import { env } from '@/lib/env'

interface BackgroundImageProps {
  alt: string
}

const HERO_IMAGE_URL = `${env.NEXT_PUBLIC_CF_URL}/static/homepage/hero.v1.webp`

export function BackgroundImage({ alt }: BackgroundImageProps) {
  return (
    <div className="absolute inset-0 size-full overflow-hidden select-none">
      <Image src={HERO_IMAGE_URL} alt={alt} fill className="object-cover" />
      <div className="absolute inset-0 z-1 size-full bg-gradient-to-t from-[#26342c] from-10% to-[#90A1A5]/0 opacity-80 brightness-90" />
    </div>
  )
}
