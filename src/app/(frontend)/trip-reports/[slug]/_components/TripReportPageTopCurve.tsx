import { cn } from '@/lib/utils/cn'

interface Props {
  className?: string
  fill?: string
}

export function TripReportPageTopCurve({ className, fill = '#8FA874' }: Props) {
  return (
    <svg
      viewBox="0 0 1280 360"
      className={cn('w-full', className)}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 0H1280V230C1150 210 1010 255 860 250C650 242 510 190 320 210C210 221 110 245 0 230V0Z"
        fill={fill}
      />
    </svg>
  )
}
