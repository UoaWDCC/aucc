import { NextAdventureTopCurve } from './NextAdventureTopCurve'

interface NextAdventureSectionBackgroundProps {
  children: React.ReactNode
}

export function NextAdventureSectionBackground({
  children,
}: NextAdventureSectionBackgroundProps) {
  return (
    <div className="relative min-h-184">
      <div className="absolute inset-0 -z-1 -mt-56">
        <div className="bg-water h-[44.24%]"></div>
        <div className="bg-abyss relative h-[55.76%]">
          <NextAdventureTopCurve className="absolute -top-px max-h-full" />
        </div>
      </div>
      {children}
    </div>
  )
}
