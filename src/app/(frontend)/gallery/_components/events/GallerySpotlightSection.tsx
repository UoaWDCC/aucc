import eventSpotlight from '@/assets/event-spotlight.webp'
import { Logo } from '@/assets/Logo'
import { PayloadImage } from '@/components/PayloadImage'
import type { Media } from '@/payload-types'

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

type GallerySpotlightSectionProps = {
  spotlightImage?: Media | null
  eventLabel?: string | null
}

export function GallerySpotlightSection({
  spotlightImage,
  eventLabel,
}: GallerySpotlightSectionProps) {
  const imageAspectRatio =
    spotlightImage?.width && spotlightImage.height
      ? `${spotlightImage.width} / ${spotlightImage.height}`
      : `${eventSpotlight.width} / ${eventSpotlight.height}`

  return (
    <div className="from-abyss relative flex min-h-[60vh] w-full overflow-hidden bg-gradient-to-b to-[#D3E2DA] md:min-h-[80vh] lg:min-h-screen">
      <div
        className={`absolute ${LOGO_POSITION} ${LOGO_SIZE} ${LOGO_ROTATION} ${LOGO_OPACITY}`}
      >
        <Logo />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-12 md:py-16">
        <h2 className="font-heading text-cream relative mb-[2%] w-max text-[8vw] md:text-[4vw]">
          <FlareIcon className="absolute -top-[0.2em] -left-[0.6em] h-[2em] w-auto" />
          EVENT SPOTLIGHT
          <FlareIcon className="absolute -top-[0.2em] -right-[0.6em] h-[2em] w-auto scale-x-[-1]" />
        </h2>
        <figure className="bg-abyss z-10 w-[86%] p-3 md:w-3/5">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: imageAspectRatio }}
          >
            <PayloadImage
              media={spotlightImage ?? undefined}
              placeholder={eventSpotlight}
            />
          </div>
          {eventLabel ? (
            <figcaption className="text-cream px-2 pt-3 text-center text-sm font-semibold md:text-lg">
              {eventLabel}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </div>
  )
}
