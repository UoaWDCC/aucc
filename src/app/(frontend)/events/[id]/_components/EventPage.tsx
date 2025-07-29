import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Event } from '@/payload-types'
import { SeeAllGuide } from './SeeTripGuide'

interface EventPageProps {
  event: Event
}

export function EventPage({ event }: EventPageProps) {
  return (
    <div>
      <section className="p-4">
        <h1 className="text-center text-2xl font-bold text-white">
          {event.title}
        </h1>
        <div className="mt-4 block border p-2">
          <div className="h-144 p-2">
            {event.featuredImage &&
              typeof event.featuredImage !== 'number' &&
              event.featuredImage.url && (
                <Image
                  src={event.featuredImage.url}
                  alt={event.title || ''}
                  className="h-full w-full object-cover"
                  width={300}
                  height={200}
                />
              )}
          </div>
          <div className="p-2 text-white">
            {event.description && <RichText data={event.description} />}
            <div className="mt-4 text-center">
              {event.startTime && (
                <p>Start: {new Date(event.startTime).toLocaleString()}</p>
              )}
              {event.endTime && (
                <p>End: {new Date(event.endTime).toLocaleString()}</p>
              )}
              {event.location && <p>Location: {event.location}</p>}
            </div>
          </div>
        </div>
      </section>
      <section className="h-190 min-h-96 bg-[conic-gradient(from_253.4deg,#78ADAE_-12.12deg,#3F443D_31.15deg,#BED76D_185.19deg,#78ADAE_347.88deg,#3F443D_391.15deg)] md:h-220">
        <div className="ml-13 flex w-2/3 flex-col md:ml-24 lg:ml-33">
          <div className="mt-25 bg-[#EFEDE3] pt-5 pr-8 pb-8 pl-7 md:mt-34 md:pt-12 md:pr-16 md:pb-18 md:pl-14 lg:mt-39 lg:pt-16 lg:pr-30 lg:pb-22 lg:pl-25">
            <h2 className="font-heading pb-8 text-[#7F9F66]">Tickets</h2>
            <div className="line-clamp-13 text-sm text-[#1E2A29] italic">
              {event.description && <RichText data={event.description} />}
            </div>
          </div>
          <div className="mt-5 flex flex-row justify-between gap-3 md:mt-8">
            <p className="w-[48%] text-sm leading-5 text-white italic md:text-lg md:leading-6">
              If you want to know more details about the plan for the weekend
              and what to pack, check out our {event.title} Trip guide!
            </p>

            <SeeAllGuide />
          </div>
        </div>
      </section>
    </div>
  )
}
