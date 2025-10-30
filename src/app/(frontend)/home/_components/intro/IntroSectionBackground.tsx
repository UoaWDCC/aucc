import { ReactNode } from 'react'

interface IntroSectionBackGroundProps {
  children?: ReactNode
}

export function IntroSectionBackground({
  children,
}: IntroSectionBackGroundProps) {
  return (
    <div className="bg-cream relative inset-0 w-full">
      <div className="max-w-256 md:mr-auto md:ml-auto xl:max-w-360">
        {children}
      </div>
      <div className="bg-water absolute bottom-0 h-[60vw] max-h-83 w-full md:max-h-46 xl:max-h-70"></div>
    </div>
  )
}
