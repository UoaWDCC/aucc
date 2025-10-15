import type { River } from '@/payload-types'
import { RiverCard } from './RiverCard'

interface RiversGridProps {
  rivers: River[]
}

export function RiversGrid({ rivers }: RiversGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {rivers.map((river) => {
        if (typeof river.featuredImage === 'number' || !river.slug) {
          return null
        }
        return (
          <RiverCard
            key={river.id}
            river={{
              ...river,
              location: river.location ?? undefined,
              featuredImage: river.featuredImage,
              slug: river.slug,
              location: river.location ?? undefined,
            }}
          />
        )
      })}
    </div>
  )
}
