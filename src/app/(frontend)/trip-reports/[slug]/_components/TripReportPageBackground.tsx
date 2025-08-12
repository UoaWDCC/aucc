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
  seafoam = '#CFE4E1',
  sage = '#8FA874',
  accent = '#DDEBE9',
  headerHeightClasses = 'h-[360px] md:h-[420px] lg:h-[720px]',
}: Props) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 -z-10', className)}
    >
      <div className="absolute inset-0" style={{ backgroundColor: seafoam }} />

      <TripReportPageTopCurve
        className={cn('absolute top-0 left-0 w-full', headerHeightClasses)}
        fill={sage}
      />
      <svg
        className="absolute top-[200px] right-0 h-[50%] w-[46%] md:top-[220px] md:w-[40%]"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M600 0V600H300C420 560 520 460 560 340C590 250 580 150 600 0Z"
          fill={accent}
        />
      </svg>
    </div>
  )
}
