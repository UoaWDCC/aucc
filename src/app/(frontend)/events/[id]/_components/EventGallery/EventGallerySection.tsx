import { EventGalleryGrid } from './EventGalleryGrid'

interface EventGallerySectionProps {
  tagName: string
}

export function EventGallerySection({ tagName }: EventGallerySectionProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <EventGalleryGrid tagName={tagName} />
    </div>
  )
}
