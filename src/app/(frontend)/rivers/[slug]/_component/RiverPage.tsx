import { RiverDTO } from '@/queries/rivers'
import { SpecificRiverHeader } from './SpecificRiverHeader/SpecificRiverHeader'

import { SpecificRiverInfo } from './SpecificRiverInfo/SpecificRiverInfo'
import { RiverGallerySection } from './SpecificRiverGallery/RiverGallerySection'

interface RiverPageProps {
  river: RiverDTO
}

export function RiverPage({ river }: RiverPageProps) {
  const slug = typeof river.slug === 'string' ? river.slug : ''
  return (
    <>
      <SpecificRiverHeader river={river} />
      <SpecificRiverInfo river={river} />
      {slug && <RiverGallerySection slug={slug} />}
    </>
  )
}
