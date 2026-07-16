import { GalleryImage, NoImages } from './GalleryImage'

type GalleryGridProps = {
  images: { src: string; alt: string }[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  if (images.length === 0) {
    return <NoImages />
  }

  return (
    <div
      data-testid="gallery-grid"
      className="grid justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      style={{ gap: 'clamp(0.5rem, 1.5vw, 1.5rem)' }}
    >
      {images.map((image, index) => (
        <GalleryImage key={index} src={image.src} alt={image.alt} />
      ))}
    </div>
  )
}
