import { cn } from '@/lib/utils/cn'

interface SwimsHeaderBottomCurveProps {
  className?: string
}

export function SwimsHeaderBottomCurve({
  className,
}: SwimsHeaderBottomCurveProps) {
  return (
    <div className="absolute bottom-0 z-1 w-full translate-y-0.5">
      <svg
        viewBox="0 0 1279 88"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-15 w-full fill-[#66989F] md:h-30', className)}
        preserveAspectRatio="none"
      >
        <path d="M1279 43.0521C821.295 178.821 341.244 -49.8513 0 10.309V88.0004H1279V43.0521Z" />
      </svg>
    </div>
  )
}
