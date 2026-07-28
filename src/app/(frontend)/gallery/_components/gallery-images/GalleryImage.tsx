export const NO_IMAGES_EMPTY_STATE_COPY =
  'There are no images available at this moment.'

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
    <div
      data-testid="gallery-empty-state"
      className="flex h-full w-full items-center justify-center text-white"
    >
      {NO_IMAGES_EMPTY_STATE_COPY}
    </div>
  )
}
