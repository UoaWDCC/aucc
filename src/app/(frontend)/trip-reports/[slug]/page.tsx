import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'

import { getTripReportBySlug } from '@/queries/trip-reports'

export default async function SpecificTripReportPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tripReport = await getTripReportBySlug(slug)

  if (!tripReport) {
    return (
      <div>
        <h1>Trip report not found</h1>
        <a>
          <code>app/(frontend)/trips/[slugs]/page.tsx</code>
        </a>
      </div>
    )
  }

  const date = tripReport?.tripDate
    ? new Date(tripReport.tripDate).toLocaleDateString()
    : ''

  return (
    <div className="m-20 flex h-full w-[90vw] flex-col bg-gray-100 p-15 pt-0">
      <div>
        <div>
          <h1 className="p-10 pb-5 text-4xl font-bold">{tripReport.title}</h1>
          <p className="p-10 pt-0 text-2xl">Date: {date}</p>
        </div>
        <div className="w-full bg-white p-5">
          {tripReport.content && <RichText data={tripReport.content} />}
        </div>
      </div>
    </div>
  )
}
