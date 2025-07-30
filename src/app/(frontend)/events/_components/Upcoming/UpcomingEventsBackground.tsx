import { ReactNode } from 'react'

interface UpcomingEventsBackGroundProps {
  children?: ReactNode
}

export function UpcomingBackground({
  children,
}: UpcomingEventsBackGroundProps) {
  return (
    <div className="bg-cream relative inset-0 w-full">
      <div className="max-w-256 md:mr-auto md:ml-auto xl:max-w-360">
        {children}
      </div>
    </div>
  )
}
