import Image from 'next/image'

type TripsCardImageProps = {
  url: string
}

export function TripsCardImage({ url }: TripsCardImageProps) {
  return (
    <div className="relative h-[251px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl">
      <Image src={url} alt="image" fill className="object-cover" />
    </div>
  )
}
