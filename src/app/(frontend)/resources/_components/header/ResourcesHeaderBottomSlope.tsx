import { cn } from '@/lib/utils/cn'

interface ResourcesHeaderBottomSlopeProps {
  className?: string
}
export function ResourcesHeaderBottomSlope({
  className,
}: ResourcesHeaderBottomSlopeProps) {
  return (
    <div className="absolute bottom-0 z-1 w-full">
      <svg
        viewBox="0 0 1280 148"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-15 w-full fill-[#d3e2da] md:h-30', className)}
        preserveAspectRatio="none"
      >
        <path d="M1280 148H0V147.277L1277.29 0H1280V148Z" />
      </svg>
    </div>
  )
}
