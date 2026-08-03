import { RiverDTO } from '@/queries/rivers'
import { SpecificRiverFooter } from './SpecificRiverGallery/SpecificRiverFooter'
import { SpecificRiverHeader } from './SpecificRiverHeader/SpecificRiverHeader'
import { SpecificRiverInfo } from './SpecificRiverInfo/SpecificRiverInfo'

interface RiverPageProps {
  river: RiverDTO
}

export function RiverPage({ river }: RiverPageProps) {
  return (
    <>
      <SpecificRiverHeader river={river} />
      <SpecificRiverInfo river={river} />
      <SpecificRiverFooter name={river.name} />
    </>
  )
}
