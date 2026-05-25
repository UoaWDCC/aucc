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
