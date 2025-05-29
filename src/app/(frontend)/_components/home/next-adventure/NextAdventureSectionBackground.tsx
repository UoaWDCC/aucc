import { NextAdventureTopCurve } from './NextAdventureTopCurve'

interface NextAdventureSectionBackgroundProps {
  children: React.ReactNode
}

export function NextAdventureSectionBackground({
  children,
}: NextAdventureSectionBackgroundProps) {
  return (
    <div className="relative min-h-96">
      <div className="absolute inset-0 -z-1">
        <div className="bg-water h-1/2"></div>
        <div className="bg-abyss relative h-1/2">
          <NextAdventureTopCurve className="absolute -top-px max-h-full" />
        </div>
      </div>
      {children}
    </div>
  )
}
