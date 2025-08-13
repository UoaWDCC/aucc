import Image from 'next/image'

import { PayloadImage } from '@/components/PayloadImage'
import { cn } from '@/lib/utils/cn'
import { formatDateRange } from '@/lib/utils/formatDateRange'
import { getPlainText } from '@/lib/utils/get-plain-text'
import type { Event } from '@/payload-types'
import { EventDTO } from '@/queries/events'
import { WaveBottomBlue } from './WaveBottomBlue'
import { WaveMidLight } from './WaveMidLight'
import { WaveTopDark } from './WaveTopDark'

interface SpecificEventIntroSectionProps {
  event: EventDTO
  className?: string
}

export function SpecificEventIntroSection({
  event,
  className,
}: SpecificEventIntroSectionProps) {
  const year =
    (event.startTime && new Date(event.startTime).getUTCFullYear()) ||
    (event.endTime && new Date(event.endTime).getUTCFullYear()) ||
    null

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <WaveTopDark />
        <WaveMidLight />
        <WaveBottomBlue />
      </div>
      <section className="relative mx-auto mt-[125px] h-[1116px] w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]">
        {/* main layout */}
        <div className="relative mx-auto h-[1116px] w-full">
          {/* Title */}
          <div className="z-30 flex h-[65px] items-start">
            <h1 className="font-heading text-cream justify-between text-3xl md:text-4xl lg:text-5xl">
              {event.title} {year && <span>{year}</span>}
            </h1>
          </div>

          {/* Hero + cards */}

          <div className="absolute right-0 z-0 aspect-[16/9] h-[667px] w-full overflow-hidden">
            <PayloadImage
              media={event.featuredImage}
              className="object-cover"
            />
          </div>
          {/* Right card: Trip details */}
          <div className="bg-cream absolute top-[312px] right-0 z-20 h-[59.77%] w-[62.87%]">
            <div className="pt-[12.74%] pr-[20.25%] pl-[11.66%]">
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
          {/* Left card: Info */}
          <div className="bg-cream absolute -bottom-[63px] left-[52px] z-20 h-[31.45%] w-[27.86%]">
            <div className="pt-[19.09%] pl-[15.92%]">
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
              <div className="text-sm italic">
                <div>{event?.river?.name ?? 'unknown'}</div>
                <div>Grade {event?.river?.grade ?? 'Grade 3'}</div>
                <a href="#river-details" className="">
                  River DETAILS
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
