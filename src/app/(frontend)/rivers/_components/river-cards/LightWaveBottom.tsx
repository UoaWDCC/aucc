import { cn } from '@/lib/utils/cn'

interface LightWaveBottomProps {
  className?: string
}
export function LightWaveBottom({ className }: LightWaveBottomProps) {
  return (
    <div>
      <svg
        viewBox="0 0 1279 631"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('w-full', className)}
      >
        <path
          d="M5.77734 329.298C406.721 355.993 888.375 -22.2059 1279 1.0293V633.55C1273.22 635.445 1267.45 637.33 1261.71 639.204H-1V328.829C1.25172 328.99 3.51076 329.147 5.77734 329.298Z"
          fill="url(#paint0_linear_3968_429)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_3968_429"
            x1="692.231"
            y1="65.62"
            x2="790.957"
            y2="815.045"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FBF9F0" />
            <stop offset="1" stopColor="#89ACAD" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
