type GalleryImageProps = {
  src: string
  alt: string
}

export function GalleryImage({ src, alt }: GalleryImageProps) {
  return (
    <div className="aspect-square w-full overflow-hidden">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}

export function NoImages() {
  return (
    <div className="text-cream flex h-full w-full items-center justify-center">
      There are no images available at this moment.
    </div>
  )
}
