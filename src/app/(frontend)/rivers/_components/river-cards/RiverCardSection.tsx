import { getRivers } from '@/queries/rivers'
import type { RiverDTO } from '@/queries/rivers'
import { RiverCard } from './RiverCard'
import { RiverCardBackground } from './RiverCardBackground'

export async function RiverCardSection() {
  const { rivers } = await getRivers({ page: 1, limit: 2 })

  if (!rivers || rivers.length === 0) return null

  const riversWithDefaults = rivers.map((r) => ({
    ...r,
    slug: r.slug ?? '',
    location: r.location ?? 'Unknown location',
    featuredImage: r.featuredImage ?? undefined,
  }))

  return (
    <RiverCardBackground>
      <div className="mx-5 -mt-130 flex flex-col items-center justify-center md:gap-20 lg:-mt-150">
        {/*Show 1 river for small screen*/}
        <div className="block md:hidden">
          <RiverCard river={riversWithDefaults[0]!} />
        </div>
        {/*Show 2 rivers for medium and larger screens*/}
        <div className="hidden w-full md:flex md:flex-col md:gap-20">
          {riversWithDefaults.map((river) => (
            <RiverCard key={river.slug} river={river} />
          ))}
        </div>
      </div>
    </RiverCardBackground>
  )
}
