import Image from 'next/image'

type GalleryImageProps = {
  src: string
  alt: string
  onClick?: () => void
}

export function GalleryImage({ src, alt, onClick }: GalleryImageProps) {
  return (
    <div
      className="aspect-square w-full cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}

export function NoImages() {
  return (
    <div className="flex h-full w-full items-center justify-center text-white">
      There are no images available at this moment.
    </div>
  )
}
