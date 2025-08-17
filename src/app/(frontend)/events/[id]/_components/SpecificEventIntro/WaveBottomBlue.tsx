import { cn } from '@/lib/utils/cn'

interface WaveBottomBlueProps {
  className?: string
}

export function WaveBottomBlue({ className }: WaveBottomBlueProps) {
  return (
    <div className="pointer-events-none absolute bottom-0 -z-20 w-full overflow-hidden">
      <svg
        width="1280"
        height="723"
        viewBox="0 0 1280 812"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('w-full', className)}
        preserveAspectRatio="none"
      >
        <path
          d="M-230.262 736.156C43.3553 858.537 522.943 836.214 1285.38 636.34L1301.02 59.8534C1234.09 69.5604 1154.53 62.8188 1058.7 26.2589C740.274 -95.2194 286.103 258.127 -47.5773 155.354C-110.037 136.117 -164.783 112.147 -212.65 87.1456L-230.262 736.156Z"
          fill="#A3C6C2"
        />
        {/* background rectangle to fill gap */}
        <rect y="343" width="1280" height="476" fill="#A3C6C2" />
      </svg>
    </div>
  )
}
