import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import Button from '@/components/Button'
import type { Media } from '@/payload-types'
import { getTripEventsForRiverId } from '@/queries/events'
import { RiverDTO } from '@/queries/rivers'
import { getTripReportsByEventIds, TripReportDTO } from '@/queries/trip-reports'

export async function SpecificRiverTripReports({ river }: { river: RiverDTO }) {
  const riverId = river?.id
  if (!riverId) return null

  const events = await getTripEventsForRiverId(riverId)
  const eventIds = Array.from(
    new Set(events.map((e) => e.id).filter(Boolean)),
  ) as (string | number)[]
  if (!eventIds.length) return null

  const reports = await getTripReportsByEventIds(eventIds, {
    limit: 2,
    depth: 1,
  })
  if (!reports.length) return null

  return (
    <section className="relative max-w-4xl py-6">
      <div className="space-y-6">
        {reports.map((r) => (
          <TripReportCard key={r.id} report={r} />
        ))}
      </div>
    </section>
  )
}

function TripReportCard({ report }: { report: TripReportDTO }) {
  const title = report.title ?? 'Trip Report'
  const href = report.slug ? `/trip-reports/${report.slug}` : '#'
  const when = report.datePublished
    ? new Date(report.datePublished).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null
  const imageUrl =
    typeof report.featuredImage === 'object'
      ? ((report.featuredImage as Media)?.url ?? undefined)
      : undefined

  return (
    <div className="bg-abyss text-cream relative grid h-[280px] w-[80vw] grid-cols-[1fr_280px] items-center rounded-2xl px-5 md:w-[45vw]">
      <div className="space-y-6">
        {when && <p className="font-body text-sm italic">{when}</p>}
        <h2 className="font-heading text-xl">{title}</h2>

        <Button
          href={href}
          intent="secondary"
          size="sm"
          color="abyss"
          className="bg-algae w-fit px-8 py-3 text-xs"
        >
          DETAILS <ArrowRight />
        </Button>
      </div>

      <div className="justify-self-end">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={240}
            height={240}
            className="h-[240px] w-[240px] rounded-2xl object-cover p-2"
          />
        ) : (
          <div className="h-[240px] w-[240px] rounded-xl bg-black/20" />
        )}
      </div>
    </div>
  )
}
