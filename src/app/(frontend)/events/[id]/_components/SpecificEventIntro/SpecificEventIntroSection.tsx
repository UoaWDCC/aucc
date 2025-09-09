import Image from 'next/image'
import Link from 'next/link'

import { Logo } from '@/assets/Logo'
import { PayloadImage } from '@/components/PayloadImage'
import { formatDateRange } from '@/lib/utils/formatDateRange'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { EventDTO } from '@/queries/events'
import { BackButton } from './BackButton'
import { WaveBottomBlue } from './WaveBottomBlue'
import { WaveMidLight } from './WaveMidLight'
import { WaveTopDark } from './WaveTopDark'

interface SpecificEventIntroSectionProps {
  event: EventDTO
  className?: string
}

export function SpecificEventIntroSection({
  event,
}: SpecificEventIntroSectionProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <WaveTopDark />
        <WaveMidLight />
        <WaveBottomBlue />
        <div className="absolute bottom-[60px] -left-[88px] z-20 h-[51.8%] w-[52.4%] -rotate-[10deg] opacity-10 md:-left-24 lg:-left-28">
          <Logo />
        </div>
      </div>

      <section className="xs:w-[300px] relative z-10 mx-auto mt-[125px] h-[1116px] w-full px-8 sm:px-12 md:px-20 lg:w-[1150px] xl:w-[1300px] 2xl:w-[1350px]">
        <div className="relative left-0 mb-2 flex justify-start md:absolute md:-top-[2%] md:mb-0">
          <BackButton />
        </div>
        {/* main layout */}
        <div className="relative mx-auto h-[1116px] w-full">
          {/* Title */}
          <div className="z-30 flex h-[65px] items-center">
            <h1 className="font-heading text-cream text-xl tracking-tight sm:text-2xl lg:text-3xl xl:text-4xl">
              {event.title}
            </h1>
          </div>

          {/* Specific Event's Image */}
          <div className="relative right-0 z-20 mt-2 aspect-[16/9] h-auto w-full overflow-hidden sm:mt-0 md:absolute md:z-0 md:h-[667px]">
            <PayloadImage
              media={event.featuredImage}
              className="object-cover"
            />
          </div>
          {/* Right card: Trip details */}
          <div className="bg-cream relative right-0 z-20 mt-6 md:absolute md:top-[270px] md:mt-0 md:h-[59.77%] md:w-[62.87%]">
            <div className="p-12 md:pt-[12.74%] md:pr-[20.25%] md:pl-[11.66%]">
              <h2 className="text-grass font-heading mb-[40px] text-lg tracking-wider">
                TRIP DETAILS
              </h2>
              <div className="text-sm italic">
                <p>
                  {getPlainText(event?.description) ??
                    'Trip details will be posted soon.'}
                </p>
              </div>
            </div>
          </div>
          {/* Left card: Info details */}
          <div className="bg-cream relative z-20 mt-6 w-full md:absolute md:-bottom-[63px] md:left-[52px] md:mt-0 md:h-[31.45%] md:w-[27.86%] md:pb-4">
            <div className="p-12 pb-6 md:pt-[19.09%] md:pl-[15.92%]">
              <div className="font-heading text-grass text-lg">Date</div>
              <div className="text-sm italic">
                {formatDateRange(event?.startTime, event?.endTime)}
              </div>
              <div className="font-heading text-grass mt-[19px] text-lg">
                Location
              </div>
              <div className="text-sm italic">{event?.location ?? 'TBC'}</div>
              <div className="font-heading text-grass mt-[19px] text-lg">
                River
              </div>
              <div>
                <div className="text-sm italic">
                  <div>
                    {`${event?.river?.name} - Grade ${event?.river?.grade}`}
                  </div>
                </div>
                <Link href={`/river/${event?.river?.id}`}>
                  <button className="font-unbounded text-algae mt-2 -ml-1 h-[33px] w-fit cursor-pointer rounded-3xl border-2 px-3 py-1.5 text-[10px]">
                    RIVER DETAILS
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
