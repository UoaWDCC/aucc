import { ReactNode } from 'react'

interface TripsSectionBackgroundProps {
  children: ReactNode
}

export function UpcomingTripsSectionBackground({
  children,
}: TripsSectionBackgroundProps) {
  return (
    <div className="bg-water relative inset-0 w-full py-20">
      <div className="w-full">{children}</div>
    </div>
  )
}
