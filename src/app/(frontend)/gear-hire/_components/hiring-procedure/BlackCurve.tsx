import { cn } from '@/lib/utils/cn'

export function BlackCurve({ className }: { className?: string }) {
  return (
    <div className="absolute z-0 w-full translate-y-0">
      <svg
        viewBox="0 0 1280 731"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('fill-abyss h-50 w-full md:h-90 lg:h-190', className)}
      >
        <path d="M1280 520.004C1141.22 528.443 982.501 526.693 816.019 604.867C389.978 772.534 440.58 696.79 93.1016 718.246C57.9757 721.363 27.1084 725.435 0 730.206V0H1280V520.004Z" />
      </svg>
    </div>
  )
}
