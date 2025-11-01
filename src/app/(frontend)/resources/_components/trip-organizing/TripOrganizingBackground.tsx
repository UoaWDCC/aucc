import { ReactNode } from 'react'

interface TripOrganizingBackgroundProps {
  children?: ReactNode
}

export function TripOrganizingBackground({
  children,
}: TripOrganizingBackgroundProps) {
  return (
    <>
      <div className="bg-abyss absolute inset-0 -z-1 w-full"></div>
      {children}
    </>
  )
}
