import { Logo } from '@/assets/Logo'
import { cn } from '@/lib/utils/cn'

interface SpecificRiverInfoBackgroundProps {
  className?: string
}

export function SpecificRiverInfoBackground({
  className,
}: SpecificRiverInfoBackgroundProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -z-40 w-full overflow-hidden',
        className,
      )}
    >
      <svg
        width="1280"
        height="1111"
        viewBox="0 0 1593 1111"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M-241 20C-241 8.9543 -232.046 0 -221 0H1573C1584.05 0 1593 8.95431 1593 20V1091C1593 1102.05 1584.05 1111 1573 1111H-221C-232.046 1111 -241 1102.05 -241 1091V20Z"
          fill="#A3C6C2"
        />
      </svg>

      <div className="absolute top-[4vh] right-[1%] w-[600px] max-w-[38vw] rotate-[25deg] opacity-10">
        <Logo />
      </div>
      <svg
        width="1280"
        height="800"
        viewBox="0 0 1442 1998"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[560px] w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M-98.0893 139.022C454.183 798.906 1027.9 -272.331 1428.27 69.4181L1441.76 1986.62L-85.0113 1997.36L-98.0893 139.022Z"
          fill="#7F9F66"
        />
      </svg>
    </div>
  )
}
