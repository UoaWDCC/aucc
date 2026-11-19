import type { RiverDTO } from '@/queries/rivers'
import { RiverCard } from './RiverCard'
import { RiverCardBackground } from './RiverCardBackground'
import { RiversPagination } from './RiversPagination'

interface RiverCardSectionProps {
  rivers: RiverDTO[]
  page?: number
  totalPages?: number
}

export function RiverCardSection({
  rivers,
  page = 1,
  totalPages = 1,
}: RiverCardSectionProps) {
  if (!rivers || rivers.length === 0) return null

  const riversWithDefaults = rivers.map((r) => ({
    ...r,
    slug: r.slug ?? '',
    location: r.location ?? 'Unknown location',
    featuredImage: r.featuredImage ?? undefined,
  }))

  return (
    <RiverCardBackground>
      <div className="mx-5 -mt-130 flex flex-col items-center justify-center gap-10 pb-20 md:gap-20 lg:-mt-150">
        {/*Show all rivers*/}
        <div className="flex w-full max-w-[400px] flex-col gap-10 md:max-w-5xl">
          {riversWithDefaults.map((river) => (
            <RiverCard key={river.slug} river={river} />
          ))}
        </div>
        <RiversPagination page={page} totalPages={totalPages} />
      </div>
    </RiverCardBackground>
  )
}
