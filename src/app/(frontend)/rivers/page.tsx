import { notFound } from 'next/navigation'

import { getRivers } from '@/queries/rivers'
import { getRiversGlobal } from '@/queries/rivers-global'
import { RiversPage } from './_components/RiversPage'

const RIVERS_PER_PAGE = 10

/** Parses ?page=. Missing means page 1; anything but a whole number ≥ 1 is invalid. */
function parsePage(value: string | string[] | undefined): number | null {
  if (value === undefined) return 1
  if (typeof value !== 'string' || !/^\d+$/.test(value)) return null
  const page = Number(value)
  return page >= 1 ? page : null
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>
}) {
  const page = parsePage((await searchParams).page)
  // notFound() throws, so it must stay outside the try/catch below.
  if (page === null) notFound()

  let data
  try {
    const [{ headerImage, introText }, { rivers, totalPages }] =
      await Promise.all([
        getRiversGlobal(),
        getRivers({ page, limit: RIVERS_PER_PAGE }),
      ])
    data = { headerImage, introText, rivers, totalPages }
  } catch (error) {
    console.error('Error loading rivers data:', error)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Rivers Page</h1>
          <p>Unable to load rivers data. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (page > 1 && data.rivers.length === 0) notFound()

  return <RiversPage {...data} page={page} />
}
