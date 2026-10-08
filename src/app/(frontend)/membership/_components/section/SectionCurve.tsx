import { cn } from '@/lib/utils/cn'

export function SectionCurve({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1279 88"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-[calc(100%-1px)] z-10 block h-10 w-full fill-current md:h-24',
        className,
      )}
    >
      <path d="M0 56C420 18 860 70 1279 0V88H0V56Z" />
    </svg>
  )
}
