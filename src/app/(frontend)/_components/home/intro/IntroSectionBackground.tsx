import { ReactNode } from 'react'

interface IntroSectionBackGroundProps {
  children?: ReactNode
}

export function IntroSectionBackground({
  children,
}: IntroSectionBackGroundProps) {
  return <div className="relative inset-0 w-full">{children}</div>
}
