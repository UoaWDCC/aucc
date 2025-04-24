import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { TripReport } from '@/payload-types'

export interface TripReportCardProps {
  report: TripReport
}

export function TripReportCard({ report }: TripReportCardProps) {
  const galleryItems = report.gallery as { url: string }[] | undefined
  const coverImage = galleryItems?.[0]?.url
  return (
    <Link
      href={`/trip-reports/${report.slug}`}
      className="m-1 block border p-2 shadow transition duration-200 hover:shadow-lg"
    >
      {coverImage && (
        <div className="relative h-48 w-full">
          <Image
            src={coverImage}
            alt={report.title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <h3 className="mb-1 text-lg font-semibold">{report.title}</h3>
      {report.tripDate && (
        <p className="mb-1 text-sm text-gray-500">
          {new Date(report.tripDate).toLocaleDateString()}
        </p>
      )}
      {report.location && (
        <p className="text-sm text-gray-700">{report.location}</p>
      )}
    </Link>
  )
}
