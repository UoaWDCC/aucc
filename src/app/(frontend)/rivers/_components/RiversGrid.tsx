import type { River } from '@/payload-types'
import { RiverCard } from './RiverCard'

interface RiversGridProps {
  rivers: River[]
}

export function RiversGrid({ rivers }: RiversGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {rivers.map((river) => (
        <RiverCard key={river.id} river={river} />
      ))}
    </div>
  )
}
