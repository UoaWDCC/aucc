import { cn } from '@/lib/utils/cn'
import { TripReportPageTopCurve } from './TripReportPageTopCurve'

interface Props {
  className?: string
  seafoam?: string
  sage?: string
  accent?: string
  headerHeightClasses?: string
}

export function TripReportsPageBackground({
  className,
  headerHeightClasses = 'h-[360px] md:h-[420px] lg:h-[720px]',
}: Props) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 -z-10', className)}
    >
      <div className="bg-seafoam absolute inset-0" />

      <TripReportPageTopCurve
        className={cn(
          'fill-grass absolute top-0 left-0 w-full',
          headerHeightClasses,
        )}
      />

      <div className="bg-water absolute bottom-0 left-0 h-[40%] w-full">
        <svg
          width="1280"
          height="322"
          viewBox="0 0 1280 322"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-water absolute top-0 w-full -translate-y-[calc(100%-1px)]"
        >
          <path d="M682.749 170.18C893.742 49.1789 1102.29 -63.6002 1280 43.7637V322H0V227.47C207.487 250.591 452.894 197.208 682.749 170.18Z" />
        </svg>
      </div>
    </div>
  )
}
