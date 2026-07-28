import Image from 'next/image'

import eventSpotlight from '@/assets/event-spotlight.webp'
import { Logo } from '@/assets/Logo'

const LOGO_SIZE = 'w-2/5 h-auto'
const LOGO_OPACITY = 'opacity-5'
const LOGO_ROTATION = '-rotate-10'
const LOGO_POSITION = 'top-0 -left-[5%]'

function FlareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 27 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M25.3742 9.15649C24.1801 7.41013 24.0727 5.10787 22.7908 3.42981"
        stroke="#EFEFE1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M13.1833 15.282C11.4206 15.0116 10.0856 13.6039 8.66617 12.6587C7.89977 12.1484 6.41536 11.5567 6.10571 10.6427"
        stroke="#EFEFE1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M2.46411 28.7404L8.49955 29.6662"
        stroke="#EFEFE1"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function GallerySpotlightSection() {
  return (
    <div className="from-abyss relative flex h-[60vh] w-full overflow-hidden bg-gradient-to-b to-[#D3E2DA] md:h-[80vh] lg:h-[100vh]">
      <div
        className={`absolute ${LOGO_POSITION} ${LOGO_SIZE} ${LOGO_ROTATION} ${LOGO_OPACITY}`}
      >
        <Logo />
      </div>
      <div className="absolute flex w-full flex-col items-center justify-center">
        <h2 className="font-heading text-cream relative mt-[8%] mb-[2%] w-max text-[4vw]">
          <FlareIcon className="absolute -top-[0.2em] -left-[0.6em] h-[2em] w-auto" />
          EVENT SPOTLIGHT
          <FlareIcon className="absolute -top-[0.2em] -right-[0.6em] h-[2em] w-auto scale-x-[-1]" />
        </h2>
        <Image
          src={eventSpotlight}
          alt="About Us Header"
          className="border-abyss z-10 w-3/5 border-12"
        />
      </div>
    </div>
  )
}
