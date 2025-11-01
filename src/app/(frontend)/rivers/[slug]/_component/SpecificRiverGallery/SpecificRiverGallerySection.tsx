import { SpecificRiverGalleryGrid } from './SpecificRiverGalleryGrid'

interface SpecificRiverGallerySectionProps {
  name: string
}

export function SpecificRiverGallerySection({
  name,
}: SpecificRiverGallerySectionProps) {
  return (
    <div className="flex flex-col items-center">
      <SpecificRiverGalleryGrid name={name} />
    </div>
  )
}
