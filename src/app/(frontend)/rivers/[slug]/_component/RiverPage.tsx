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
      <div className="p-4">
        <h1 className="text-center text-3xl font-bold">{river.name}</h1>
        <SpecificRiverInfo river={river} />
      </div>
    </>
  )
}
