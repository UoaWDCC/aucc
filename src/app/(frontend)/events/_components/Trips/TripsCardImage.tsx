import Image from 'next/image'

type TripsCardImageProps = {
  url: string
}

export function TripsCardImage({ url }: TripsCardImageProps) {
  return (
    <div className="relative flex h-[251px] w-full flex-shrink-0 justify-center overflow-hidden rounded-2xl md:w-[300px]">
      <Image src={url} alt="image" fill className="object-cover" />
    </div>
  )
}
