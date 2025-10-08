import { cn } from '@/lib/utils/cn'

interface LightWaveTopProps {
  className?: string
}
export function LightWaveTop({ className }: LightWaveTopProps) {
  return (
    <div className="pointer-events-none absolute w-full overflow-hidden">
      <svg
        viewBox="0 0 1280 787"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-auto w-full', className)}
      >
        <path
          d="M0 4.05048C352.989 -39.3405 828.377 285.21 1280 57.3366V787H0V4.05048Z"
          fill="#D3E2DA"
        />
      </svg>
    </div>
  )
}
