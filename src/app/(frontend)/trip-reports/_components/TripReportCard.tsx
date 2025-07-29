import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { getPlainText } from '@/lib/utils/get-plain-text'
import { TripReport } from '@/payload-types'
import type { Exec } from '@/payload-types'

const PLACEHOLDER = '/hero_background_Image.jpg'

export interface TripReportCardProps {
  report: TripReport
}

function isExec(a: number | Exec): a is Exec {
  return typeof a !== 'number'
}

export function TripReportCard({ report }: TripReportCardProps) {
  const postAuthors = report.author.filter(isExec)
  const featuredImage =
    report.featuredImage && typeof report.featuredImage !== 'number'
      ? report.featuredImage.url
      : PLACEHOLDER

  return (
    <Link
      href={`/trip-reports/${report.slug}`}
      className="m-1 block border p-2 shadow transition duration-200 hover:shadow-lg"
    >
      {featuredImage && (
        <div className="relative h-48 w-full">
          <Image
            src={featuredImage}
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
      {postAuthors.length > 0 && (
        <p className="mt-1 text-sm text-gray-500">
          By {postAuthors.map((a) => a.name).join(', ')}
        </p>
      )}
      {report.content && (
        <div className="mt-1 line-clamp-2 text-sm whitespace-pre-wrap text-gray-600">
          {getPlainText(report.content)}
        </div>
      )}
    </Link>
  )
}
