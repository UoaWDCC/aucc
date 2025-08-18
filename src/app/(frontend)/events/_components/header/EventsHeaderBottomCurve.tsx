import { cn } from '@/lib/utils/cn'

interface EventsHeaderBottomCurveProps {
  className?: string
}
export function EventsHeaderBottomCurve({
  className,
}: EventsHeaderBottomCurveProps) {
  return (
    <div className="absolute bottom-0 z-1 w-full translate-y-0.5">
      <svg
        viewBox="0 0 1279 88"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('fill-cream h-15 w-full md:h-30', className)}
        preserveAspectRatio="none"
      >
        <path d="M0 43.0521C457.705 178.821 937.756 -49.8513 1279 10.309V88.0004H0V43.0521Z" />
      </svg>
    </div>
  )
}
