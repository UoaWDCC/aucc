import React, { Suspense } from 'react'
import Link from 'next/link'

import { GetTripReports } from './_components/GetTripReports'
import { TripReportsGrid } from './_components/TripReportsGrid'
import { TripReportsGridFallback } from './_components/TripReportsGridFallback'

export default async function TripReportsPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string }
}) {
  // const {docs: reports} = await GetTripReports(1, 20, '-createdAt')
  const page = parseInt(searchParams.page as string) || 1
  const limit = parseInt(searchParams.limit as string) || 2
  const {
    docs: reports,
    totalDocs,
    hasNextPage,
    nextPage,
  } = await GetTripReports(page, limit, '-createdAt')
  const totalPages = Math.ceil(totalDocs / limit)

  const pageLinks: (number | '…')[] = []
  const delta = 2
  const left = Math.max(1, page - delta)
  const right = Math.min(totalPages, page + delta)

  if (left > 1) {
    pageLinks.push(1)
    if (left > 2) pageLinks.push('…')
  }
  for (let p = left; p <= right; p++) {
    pageLinks.push(p)
  }
  if (right < totalPages) {
    if (right < totalPages - 1) pageLinks.push('…')
    pageLinks.push(totalPages)
  }

  return (
    <div className="p-4">
      <div className="text-left">
        <h1 className="text-2xl font-bold">Trip Reports</h1>
        <h2 className="text-gray-600">A list of all trip reports available.</h2>
      </div>
      <Suspense fallback={<TripReportsGridFallback />}>
        <TripReportsGrid reportsList={reports} />
      </Suspense>
      <div className="mt-4 flex justify-center">
        <div className="inline-flex items-center space-x-2">
          {page > 1 && (
            <Link
              href={`?page=${page - 1}&limit=${limit}`}
              className="rounded bg-gray-200 px-3 py-1"
            >
              &larr; Prev
            </Link>
          )}

          {pageLinks.map((p, i) =>
            p === '…' ? (
              <span key={`dots-${i}`} className="px-2">
                …
              </span>
            ) : (
              <Link
                key={p}
                href={`?page=${p}&limit=${limit}`}
                className={`rounded px-2 py-1 ${
                  p === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {p}
              </Link>
            ),
          )}

          {hasNextPage && (
            <Link
              href={`?page=${nextPage}&limit=${limit}`}
              className="rounded bg-gray-200 px-3 py-1"
            >
              Next &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
