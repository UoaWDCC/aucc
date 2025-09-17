import Image from 'next/image'

import Button from '@/components/Button'
import { getTripEventsForRiverId } from '@/queries/events'
import { RiverDTO } from '@/queries/rivers'
import { getTripReportsByEventIds, TripReportDTO } from '@/queries/trip-reports'

export async function SpecificRiverTripReports({ river }: { river: RiverDTO }) {
  const riverId = (river as any)?.id as string | number | undefined
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
    <section className="relative mx-auto w-full max-w-6xl px-4 py-8 md:pr-24">
      <div className="pointer-events-none absolute inset-y-0 -right-200 hidden w-full items-center justify-center md:flex">
        <span className="font-heading text-cream/90 origin-center -rotate-90 text-xl uppercase select-none">
          Relevant Trip Reports
        </span>
      </div>

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
  const imageUrl = (report as any)?.featuredImage?.url as string | undefined

  return (
    <div className="bg-abyss text-cream relative translate-x-100 rounded-2xl px-5 py-9 md:grid md:min-h-[224px] md:grid-cols-[1fr_360px] md:items-center md:gap-16 lg:mx-30">
      <div className="space-y-6">
        <h2 className="font-heading text-xl">{title}</h2>
        {when && <p className="font-body text-sm italic opacity-80">{when}</p>}

        <Button
          href={href}
          intent="primary"
          size="sm"
          color="algae"
          className="bg-algae text-abyss w-fit rounded-4xl border-transparent px-4 py-1 text-xs font-semibold tracking-wider uppercase"
        >
          DETAILS →
        </Button>
      </div>

      <div className="justify-self-end">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={360}
            height={224}
            className="h-56 w-[360px] rounded-xl object-cover"
          />
        ) : (
          <div className="h-56 w-[360px] rounded-xl bg-black/20" />
        )}
      </div>
    </div>
  )
}
