import { ReactNode } from 'react'
import Image from 'next/image'

import lookingForUsBackground from '@/assets/looking-for-us-background.webp'

interface ContactSectionBackGroundProps {
  children?: ReactNode
}

export function ContactSectionBackground({
  children,
}: ContactSectionBackGroundProps) {
  return (
    <div className="relative w-full">
      <div
        className="absolute top-[160px] left-0 z-0 h-[50%] w-full overflow-hidden select-none md:top-[80px]"
        style={{
          clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0 70%)',
        }}
      >
        <Image
          src={lookingForUsBackground}
          alt="Contact background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
