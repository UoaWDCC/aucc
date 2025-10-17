import Image from 'next/image'

import { RiverDTO } from '@/queries/rivers'
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
    </>
  )
}
