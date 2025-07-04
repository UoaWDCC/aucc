import { Calendar } from 'lucide-react'

type DateProps = {
  startTime: string
  endTime: string
}

export function NextAdventureDate({ startTime, endTime }: DateProps) {
  return (
    <div className="flex items-center gap-1">
      <Calendar size={20} color="#EFEFE1" />
      <div>
        <p>
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
