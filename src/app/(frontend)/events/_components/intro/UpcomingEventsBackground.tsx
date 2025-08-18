import { ReactNode } from 'react'

interface UpcomingEventsBackGroundProps {
  children?: ReactNode
}
export function UpcomingBackground({
  children,
}: UpcomingEventsBackGroundProps) {
  return (
    <div className="bg-cream relative inset-0 w-full pb-20">
      <div className="w-full max-w-256 md:mx-auto xl:max-w-360">{children}</div>
    </div>
  )
}
