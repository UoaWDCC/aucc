import { cn } from '@/lib/utils/cn'

interface IntroBottomCurveProps {
  className?: string
}
export function IntroBottomCurve({ className }: IntroBottomCurveProps) {
  return (
    <div className="absolute bottom-0 z-1 w-full translate-y-0.5">
      {/* <svg
        viewBox="0 0 1280 110"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('fill-cream h-14 w-full md:h-auto', className)}
        preserveAspectRatio="none"
      >
        <path d="M2.70312 54.0514C463.155 225.655 945.947 -73.0313 1280 17.5045V110H0V53.0387L2.70312 54.0514Z" />
      </svg> */}
      <svg
        viewBox="0 0 1279 88"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('fill-cream h-12 w-full md:h-auto', className)}
        preserveAspectRatio="none"
      >
        <path d="M0 43.0521C457.705 178.821 937.756 -49.8513 1279 10.309V88.0004H0V43.0521Z" />
      </svg>
    </div>
  )
}
