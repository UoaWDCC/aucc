import { ArrowRightToLine } from 'lucide-react'

import { River } from '@/payload-types'
import { BackButton } from './BackButton'
import { SpecificRiverHeaderBackground } from './SpecificRiverHeaderBackground'
import { SpecificRiverHeaderName } from './SpecificRiverHeaderName'
import { SpecificRiverHeaderText } from './SpecificRiverHeaderText'

interface RiverPageProps {
  river: River
}

export function SpecificRiverHeader({ river }: RiverPageProps) {
  const description = river.description ?? ''
  const name = river.name
  return (
    <SpecificRiverHeaderBackground>
      <BackButton />
      <SpecificRiverHeaderName name={name} />
      <SpecificRiverHeaderText description={description} />
    </SpecificRiverHeaderBackground>
  )
}
