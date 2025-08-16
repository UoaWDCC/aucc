import { Calendar } from 'lucide-react'

type DateProps = {
  startTime: string
  endTime: string
}

export function TripsCardDate({ startTime, endTime }: DateProps) {
  const startDate = new Date(startTime)
  const endDate = new Date(endTime)
  const sameYear = startDate.getFullYear() === endDate.getFullYear()
  const sameMonth = startDate.getMonth() === endDate.getMonth() && sameYear

  return (
    <div className="flex items-center gap-1">
      <Calendar className="text-cream size-5" />
      <div>
        <p className="font-unbounded truncate text-sm capitalize">
          {`${startDate.toLocaleDateString('en-NZ', {
            day: 'numeric',
            ...(sameMonth ? {} : { month: 'short' }),
            ...(sameYear ? {} : { year: 'numeric' }),
          })}
            ${' - '}
            ${endDate.toLocaleDateString('en-NZ', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}`}
        </p>
      </div>
    </div>
  )
}
