import { Calendar } from 'lucide-react'

type DateProps = {
  startTime: string
  endTime: string
}

export function NextAdventureDate({ startTime, endTime }: DateProps) {
  return (
    <div className="flex items-center gap-1">
      <Calendar className="h-5 w-5 text-[#EFEFE1] md:h-3 md:w-3 lg:h-5 lg:w-5" />
      <div>
        <p className="font-unbounded text-sm md:text-[8px] lg:text-xs">
          {new Date(startTime).getDate()}-{new Date(endTime).getDate()}{' '}
          {new Date(startTime)
            .toLocaleDateString('en-US', { month: 'long' })
            .toUpperCase()}{' '}
          {new Date(startTime).getFullYear()}
        </p>
      </div>
    </div>
  )
}
