import { ReactNode } from 'react'
import Image from 'next/image'

interface ContactSectionBackGroundProps {
  children?: ReactNode
}

export function ContactSectionBackground({
  children,
}: ContactSectionBackGroundProps) {
  return (
    <div className="relative w-full">
      <div
        className="absolute top-[220px] left-0 z-0 h-[40%] w-full overflow-hidden md:top-[50px] md:h-[48%] lg:top-[40px] lg:h-[48%]"
        style={{
          clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0 70%)',
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-background.v1.webp`}
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
