import { RiverDTO } from '@/queries/rivers'
import { RiverGallerySection } from './SpecificRiverGallery/RiverGallerySection'
import { SpecificRiverFooter } from './SpecificRiverGallery/SpecificRiverFooter'
import { SpecificRiverHeader } from './SpecificRiverHeader/SpecificRiverHeader'
import { SpecificRiverInfo } from './SpecificRiverInfo/SpecificRiverInfo'

interface RiverPageProps {
  river: RiverDTO
}

export function RiverPage({ river }: RiverPageProps) {
  const slug = typeof river.slug === 'string' ? river.slug : ''
  return (
    <>
      <SpecificRiverHeader river={river} />
      <SpecificRiverInfo river={river} />
      <SpecificRiverFooter name={river.name} />
    </>
  )
}
