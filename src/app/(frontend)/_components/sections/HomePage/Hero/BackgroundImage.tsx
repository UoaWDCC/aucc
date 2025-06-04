import Image from 'next/image'

import { env } from '@/lib/env'

interface BackgroundImageProps {
  alt: string
}

export function BackgroundImage({ alt }: BackgroundImageProps) {
  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
      <Image
        src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/hero.v1.webp`}
        alt={alt}
        fill
        className="absolute inset-0 size-full translate-y-[-60px] scale-130 object-cover brightness-90 md:translate-x-25 md:scale-120"
      />
      <div className="absolute inset-0 z-1 h-full w-full bg-gradient-to-t from-black/60 to-white/15 opacity-90" />
    </div>
  )
}
