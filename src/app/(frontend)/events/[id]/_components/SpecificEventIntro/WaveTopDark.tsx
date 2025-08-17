import { cn } from '@/lib/utils/cn'

interface WaveTopDarkProps {
  className?: string
}

export function WaveTopDark({ className }: WaveTopDarkProps) {
  return (
    <div className="pointer-events-none absolute -z-40 overflow-hidden">
      <svg
        width="1280"
        height="495"
        viewBox="0 0 1280 495"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('w-full', className)}
        preserveAspectRatio="none"
      >
        <rect
          width="1306.65"
          height="870.212"
          transform="matrix(-1 0 0 1 1293.65 -376)"
          fill="#1E2A29"
        />
      </svg>
    </div>
  )
}
