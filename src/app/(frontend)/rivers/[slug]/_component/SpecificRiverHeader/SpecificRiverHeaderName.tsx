interface SpecificRiverHeaderNameProps {
  name: string
}

export function SpecificRiverHeaderName({
  name,
}: SpecificRiverHeaderNameProps) {
  return (
    <div className="font-heading text-cream mr-34 ml-auto flex h-115 max-w-177 items-center justify-items-end text-right text-5xl tracking-tighter">
      {name}
    </div>
  )
}
