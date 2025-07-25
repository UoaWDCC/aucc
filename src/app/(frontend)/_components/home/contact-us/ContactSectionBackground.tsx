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
        className="absolute top-[240px] left-0 z-0 h-[40%] w-full overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 100% 15%, 100% 100%, 0 85%)',
        }}
      >
        <Image
          src={lookingForUsBackground}
          alt="Contact background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
