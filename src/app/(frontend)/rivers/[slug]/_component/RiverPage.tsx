import { RiverDTO } from '@/queries/rivers'
import { SpecificRiverHeader } from './SpecificRiverHeader/SpecificRiverHeader'
import { RiverGallerySection } from './SpecificRiverGallery/RiverGallerySection'

interface RiverPageProps {
  river: RiverDTO
}

export function RiverPage({ river }: RiverPageProps) {
  const slug = typeof river.slug === 'string' ? river.slug : ''
  return (
    <>
      <SpecificRiverHeader river={river} />
      {slug && <RiverGallerySection slug={slug} />}
    </>
  )
}
