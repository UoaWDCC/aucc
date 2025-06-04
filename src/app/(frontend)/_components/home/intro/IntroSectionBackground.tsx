import { ReactNode } from 'react'

interface IntroSectionBackGroundProps {
  children?: ReactNode
}

export function IntroSectionBackground({
  children,
}: IntroSectionBackGroundProps) {
  return (
    <div className="relative inset-0 w-full">
      <div className="bg-water absolute bottom-0 h-[60vw] max-h-83 w-full"></div>
      {children}
    </div>
  )
}
