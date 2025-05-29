import { cn } from '@/lib/utils/cn'

interface GalleryTopCurveProps {
  className?: string
}
export function GalleryTopCurve({ className }: GalleryTopCurveProps) {
  return (
    <>
      <svg
        viewBox="0 0 375 52"
        className={cn('fill-abyss h-12 w-full md:hidden', className)}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M375 44.5947C335.522 19.4707 284.742 -0.104342 206.919 38.4785C140.919 71.1995 70.7534 36.7274 0 0.351562V0H375V44.5947Z" />
      </svg>
      <svg
        viewBox="0 0 1280 147"
        className={cn('fill-abyss hidden w-full md:block', className)}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M1280 110.559C1223.6 102.003 1156.13 105.406 1074.21 130.619C802.024 214.394 425.889 -57.093 141.224 12.4863C87.9386 25.5105 41.0716 42.2036 0 59.8008V0H1280V110.559Z" />
      </svg>
    </>
  )
}
