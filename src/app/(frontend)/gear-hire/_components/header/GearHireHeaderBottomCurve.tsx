import { cn } from '@/lib/utils/cn'

interface GearHireHeaderBottomCurveProps {
  className?: string
}
export function GearHireHeaderBottomCurve({
  className,
}: GearHireHeaderBottomCurveProps) {
  return (
    <div className="absolute bottom-0 z-1 w-full translate-y-0.5">
      <svg
        width="1280"
        height="134"
        viewBox="0 0 1280 134"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('fill-abyss h-15 w-full', className)}
      >
        <path d="M1280 134H0V111.862C281.771 42.7295 697.793 6.84745 1280 0.954834V134Z" />
      </svg>
    </div>
  )
}
