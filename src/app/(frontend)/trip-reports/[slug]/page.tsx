import { notFound } from 'next/navigation'

import { mediaUrl } from '@/lib/metadata'
import { buildPageMetadata } from '@/lib/page-metadata'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { getTripReportBySlug } from '@/queries/trip-reports'
import { TripReportPage } from './_components/TripReportPage'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const tripReport = await getTripReportBySlug(slug)

  if (!tripReport) return { title: 'Trip report not found' }

  return buildPageMetadata({
    title: tripReport.title,
    description: getPlainText(tripReport.content),
    path: `/trip-reports/${tripReport.slug ?? slug}`,
    image: mediaUrl(tripReport.featuredImage),
    type: 'article',
    publishedTime: tripReport.datePublished,
  })
}

export default async function SpecificTripReportPage({ params }: PageProps) {
  const { slug } = await params
  const tripReport = await getTripReportBySlug(slug)

  if (!tripReport) {
    return notFound()
  }
  return <TripReportPage tripReport={tripReport} />
}
