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

  return (
    <div>
      <div>
        <div>
          <h1 className="p-10 pb-5 text-4xl font-bold">{tripReport.title}</h1>
          <p className="p-10 pt-0 text-2xl">{tripReport.tripDate}</p>
        </div>
      </div>
    </div>
  )
}
