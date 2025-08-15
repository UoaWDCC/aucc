import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Event } from '@/payload-types'
import { SignUpToJoin } from './SignUpToJoin'

interface EventPageProps {
  event: Event
}
export function TicketInformationSection({ event }: EventPageProps) {
  return (
    <section className="h-190 min-h-96 bg-[conic-gradient(from_253.4deg,#78ADAE_-12.12deg,#3F443D_31.15deg,#BED76D_185.19deg,#78ADAE_347.88deg,#3F443D_391.15deg)] md:h-220">
      <div className="ml-13 flex w-2/3 flex-col md:ml-24 lg:ml-33">
        <div className="mt-25 h-100 bg-[#EFEDE3] py-8 pr-8 pl-7 md:mt-34 md:h-110 md:pt-12 md:pr-16 md:pb-18 md:pl-14 lg:mt-39 lg:h-120 lg:pt-16 lg:pr-30 lg:pb-22 lg:pl-25">
          <h2 className="font-heading pb-8 text-[#7F9F66]">Tickets</h2>
          <div className="text-sm text-[#1E2A29] italic">
            {event.ticketsInformation && (
              <RichText data={event.ticketsInformation} />
            )}
          </div>
        </div>
        <div className="mt-5 flex flex-row justify-between gap-3 md:mt-8">
          <p className="w-[48%] text-sm leading-5 text-white italic md:text-lg md:leading-6">
            {`If you're not already a member, you'll need to sign up to join trips
            like this one.`}
          </p>
          <SignUpToJoin />
        </div>
      </div>
    </section>
  )
}
