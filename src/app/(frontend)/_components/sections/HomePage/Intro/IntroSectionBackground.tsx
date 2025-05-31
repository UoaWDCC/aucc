import { ReactNode } from 'react'

interface IntroSectionBackGroundProps {
  children?: ReactNode
}

export function IntroSectionBackground({
  children,
}: IntroSectionBackGroundProps) {
  return (
    <div className="relative inset-0 h-300 w-full bg-transparent">
      <div className="absolute inset-0">
        <div className="bg-cream h-167.5" />
        <div className="bg-water h-100" />
      </div>
      {children}
    </div>
  )
}
