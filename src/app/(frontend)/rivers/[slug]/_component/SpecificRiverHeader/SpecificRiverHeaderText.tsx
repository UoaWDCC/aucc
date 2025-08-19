interface SpecificRiverHeaderTextProps {
  description?: string
}

export function SpecificRiverHeaderText({
  description,
}: SpecificRiverHeaderTextProps) {
  return (
    <div className="border-water bg-cream min-h-110 w-full rounded-lg border-2 p-21">
      <h2 className="font-heading text-grass text-3xl"> Description</h2>
      <p className="font-body mt-6 text-sm leading-6 italic">{description}</p>
    </div>
  )
}
