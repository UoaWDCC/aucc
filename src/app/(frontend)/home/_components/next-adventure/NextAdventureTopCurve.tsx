import { cn } from '@/lib/utils/cn'

interface NextAdventureTopCurveProps {
  className?: string
}
export function NextAdventureTopCurve({
  className,
}: NextAdventureTopCurveProps) {
  return (
    <>
      <svg
        viewBox="0 0 375 154"
        className={cn('fill-water h-40 w-full md:hidden', className)}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M375 153.456C224.098 46.673 100.619 3.28649 0 2.54883V0H375V153.456Z" />
      </svg>
      <svg
        viewBox="0 0 1280 154"
        className={cn('fill-water hidden w-full md:block', className)}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M1280 153.209C639.537 -10.5442 234.3 -36.7806 0 48.5664V0H1280V153.209Z" />
      </svg>
    </>
  )
}
