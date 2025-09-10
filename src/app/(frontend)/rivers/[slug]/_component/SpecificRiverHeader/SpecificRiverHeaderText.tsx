import { cn } from '@/lib/utils/cn'

interface SpecificRiverHeaderTextProps {
  className?: string
  description: string
}

export function SpecificRiverHeaderText({
  className,
  description,
}: SpecificRiverHeaderTextProps) {
  return (
    <div
      className={cn(
        'border-water bg-cream ml-22 h-110 w-[100%] max-w-163 rounded-lg border-2 p-21 md:max-w-200',
        className,
      )}
    >
      <h2 className="font-heading text-grass text-3xl"> Description</h2>
      <p className="font-body mt-6 text-sm leading-6 italic">{description}</p>
    </div>
  )
}
