import { cn } from '@/lib/utils/cn'

interface WaveMidLightProps {
  className?: string
}

export function WaveMidLight({ className }: WaveMidLightProps) {
  return (
    <div className="pointer-events-none absolute top-[285px] -z-30 w-full overflow-hidden">
      <svg
        width="1280"
        height="496"
        viewBox="0 0 1280 496"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('w-full', className)}
        preserveAspectRatio="none"
      >
        <path
          d="M-48.0002 32.2281C435.61 197.693 948.912 -68.3391 1300.35 17.5548V495.5H-48.0002V32.2281Z"
          fill="#D3E2DA"
        />
      </svg>
    </div>
  )
}
