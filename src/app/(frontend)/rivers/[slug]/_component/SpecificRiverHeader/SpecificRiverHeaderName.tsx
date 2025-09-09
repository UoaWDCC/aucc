interface SpecificRiverHeaderNameProps {
  name: string
}

export function SpecificRiverHeaderName({
  name,
}: SpecificRiverHeaderNameProps) {
  return (
    <div className="font-heading text-cream mr-5 ml-auto flex h-60 w-[73%] max-w-100 items-center justify-end text-right text-2xl tracking-tighter md:mr-34 md:h-115 md:w-[60%] md:max-w-177 md:text-5xl">
      {name}
    </div>
  )
}
