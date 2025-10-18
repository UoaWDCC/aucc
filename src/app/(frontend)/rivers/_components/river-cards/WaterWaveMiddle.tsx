import { cn } from '@/lib/utils/cn'

interface WaterWaveMiddleProps {
  className?: string
}
export function WaterWaveMiddle({ className }: WaterWaveMiddleProps) {
  return (
    <div>
      <svg
        viewBox="0 0 1279 676"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('w-full', className)}
      >
        <path
          d="M-2 10.5692C344.155 -60.18 821.392 254.211 1279 71.5467V415.218C1208.59 485.587 1102.82 597.232 902.356 512.477C653.694 407.347 310.067 748.041 50.0029 660.724C31.8642 654.634 14.54 647.904 -2 640.715V10.5692Z"
          fill="#A3C6C2"
        />
      </svg>
    </div>
  )
}
