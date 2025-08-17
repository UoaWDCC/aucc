import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ChevronLeft } from 'lucide-react'

import { PayloadImage } from '@/components/PayloadImage'
import { TripReportDTO } from '@/queries/trip-reports'
import { TripReportsPageBackground } from './TripReportPageBackground'

type TripReportPage = { tripReport: TripReportDTO }

export function TripReportPage({ tripReport }: TripReportPage) {
  // Comments out authors and date for now to have more flexibility.
  // const authors = tripReport.authors.map((a) => a.name)
  // const date = tripReport.relatedEvent.startTime
  //   ? new Date(tripReport.relatedEvent.startTime).toLocaleDateString('en-NZ', {
  //       day: 'numeric',
  //       month: 'long',
  //       year: 'numeric',
  //     })
  //   : null

  // const location = tripReport.relatedEvent.location

  return (
    <section className="relative min-h-screen pt-20 pb-20 md:pt-28">
      <TripReportsPageBackground />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-3 md:mb-4">
          <Link
            href="/trip-reports"
            className="text-cream/90 inline-flex items-center gap-1 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
            Back
          </Link>
        </div>
        <h1 className="font-heading text-cream mb-6 text-3xl leading-tight tracking-tighter uppercase md:text-5xl lg:text-6xl">
          {tripReport.title}
        </h1>
        <article className="bg-cream rounded-none p-8 shadow md:p-14 lg:p-16">
          {/* <header className="text-abyss mb-8 md:mb-10">
            <div className="font-heading text-sm tracking-[0.01em] text-[#8FC7BF] uppercase md:text-base md:tracking-[0.015em] lg:text-lg">
              {date && <span>{date}</span>}
              {location && (
                <>
                  {' - '}
                  <span>{location}</span>
                </>
              )}
            </div>

            {authors.length > 0 && (
              <div className="text-abyss/70 mt-2 text-sm md:text-base">
                By {authors.join(', ')}
              </div>
            )}
          </header> */}

          {tripReport.featuredImage && (
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden">
              <PayloadImage
                media={tripReport.featuredImage}
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg prose-headings:font-heading prose-headings:text-abyss prose-p:text-abyss/90 prose-li:marker:text-abyss/70 prose-p:my-4 md:prose-p:my-5 prose-headings:mt-8 prose-headings:mb-3 max-w-none">
            {tripReport.content && <RichText data={tripReport.content} />}
          </div>
        </article>
      </div>
    </section>
  )
}
