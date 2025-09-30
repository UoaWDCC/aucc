import { getRivers } from '@/queries/rivers'
import type { RiverDTO } from '@/queries/rivers'
import { RiverCard } from './RiverCard'
import { RiverCardBackground } from './RiverCardBackground'

export async function RiverCardSection() {
  // Fetch 2 rivers for medium/large screens
  const { rivers } = await getRivers({ page: 1, limit: 2 })

  if (!rivers || rivers.length === 0) return null

  return (
    <RiverCardBackground>
      <div className="mx-5 -mt-130 flex flex-col items-center justify-center md:gap-20 lg:-mt-150">
        {/*Show only first river on small screen*/}
        <div className="block md:hidden">
          <RiverCard
            key={rivers[0].slug ?? ''}
            river={{ ...rivers[0], slug: rivers[0].slug ?? '' }}
          />
        </div>

        {/*Show two rivers on medium and large screens*/}
        <div className="hidden w-full md:flex md:flex-col md:gap-20">
          {rivers.map((river) => (
            <RiverCard
              key={river.slug ?? ''}
              river={{ ...river, slug: river.slug ?? '' }}
            />
          ))}
        </div>
      </div>
    </RiverCardBackground>
  )
}
