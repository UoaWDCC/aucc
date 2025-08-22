import Image from 'next/image'

interface SpecificRiverHeaderImageProp {
  url: string
}

export function SpecificRiverHeaderImage({
  url,
}: SpecificRiverHeaderImageProp) {
  return (
    <div className="relative h-full w-auto overflow-hidden">
      <Image
        src={url}
        alt="Specific river header image"
        fill
        className="rounded-3xl object-cover object-left"
      />
    </div>
  )
}
