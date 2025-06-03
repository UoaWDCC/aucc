import { cn } from '@/lib/utils/cn'

interface HeroBottomCurveProps {
  className?: string
}
export function HeroBottomCurve({ className }: HeroBottomCurveProps) {
  return (
    <svg
      viewBox="0 0 1280 110"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('fill-cream h-14 w-full md:h-auto', className)}
      preserveAspectRatio="none"
    >
      <path d="M2.70312 54.0514C463.155 225.655 945.947 -73.0313 1280 17.5045V110H0V53.0387L2.70312 54.0514Z" />
    </svg>
  )
}
