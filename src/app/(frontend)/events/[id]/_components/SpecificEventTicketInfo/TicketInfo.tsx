import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Event } from '@/payload-types'
import { SignUpToJoin } from './SignUpToJoin'

interface EventPageProps {
  event: Event
}
export function TicketInformationSection({ event }: EventPageProps) {
  return (
    <section className="min-h-96 bg-[conic-gradient(from_253.4deg,#78ADAE_-12.12deg,#3F443D_31.15deg,#BED76D_185.19deg,#78ADAE_347.88deg,#3F443D_391.15deg)] py-8 md:py-12 lg:py-16">
      <div className="mr-4 ml-4 flex flex-col md:mr-8 md:ml-24 lg:mr-16 lg:ml-33">
        <div className="mt-17 bg-[#EFEDE3] py-8 pr-8 pl-7 md:mt-22 md:py-12 md:pr-16 md:pl-14 lg:mt-23 lg:py-16 lg:pr-30 lg:pl-25">
          <h2 className="font-heading pb-8 text-[#7F9F66]">Tickets</h2>
          <div className="line-clamp-13 text-sm text-[#1E2A29] italic">
            {event.ticketsInformation && (
              <RichText data={event.ticketsInformation} />
            )}
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-4 md:mt-8 md:flex-row md:justify-between md:gap-3">
          <p className="text-sm leading-5 text-white italic md:w-[48%] md:text-lg md:leading-6">
            {`If you're not already a member, you'll need to sign up to join trips
            like this one.`}
          </p>
          <div className="flex justify-center md:justify-end">
            <SignUpToJoin />
          </div>
        </div>
      </div>
    </section>
  )
}
