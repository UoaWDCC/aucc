import Image from 'next/image'

export const NO_IMAGES_EMPTY_STATE_COPY =
  'There are no images available at this moment.'

type GalleryImageProps = {
  src: string
  alt: string
  onClick?: () => void
}

export function GalleryImage({ src, alt, onClick }: GalleryImageProps) {
  return (
    <div
      className="relative aspect-square w-full cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover"
      />
    </div>
  )
}

export function NoImages() {
  return (
    <div
      data-testid="gallery-empty-state"
      className="flex h-full w-full items-center justify-center text-white"
    >
      {NO_IMAGES_EMPTY_STATE_COPY}
    </div>
  )
}
