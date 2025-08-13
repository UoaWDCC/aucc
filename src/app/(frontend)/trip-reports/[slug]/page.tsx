import { notFound } from 'next/navigation'

import { getTripReportBySlug } from '@/queries/trip-reports'
import { TripReportPage } from './_components/TripReportPage'

export default async function SpecificTripReportPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tripReport = await getTripReportBySlug(slug)

  if (!tripReport) {
    return notFound()
  }

  return <TripReportPage />
}
