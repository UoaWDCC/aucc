import { cn } from '@/lib/utils/cn'

interface TripReportsHeaderBottomCurveProps {
  className?: string
}
export function TripReportsHeaderBottomCurve({
  className,
}: TripReportsHeaderBottomCurveProps) {
  return (
    <div className="absolute bottom-0 z-1 w-full translate-y-0.5">
      <svg
        width="1280"
        height="63"
        viewBox="0 0 1280 63"
        className={cn('fill-cream h-15 w-full', className)}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 6.3418C341.493 -30.6881 821.994 110.194 1280 26.2988V63H0V6.3418Z" />
      </svg>
    </div>
  )
}
