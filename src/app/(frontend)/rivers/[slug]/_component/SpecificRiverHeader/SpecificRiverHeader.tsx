import { ArrowRightToLine } from 'lucide-react'

import { GradeBadge } from '@/components/GradeBadge'
import { RiverDTO } from '@/queries/rivers'
import { BackButton } from './BackButton'
import { SpecificRiverHeaderBackground } from './SpecificRiverHeaderBackground'
import { SpecificRiverHeaderImage } from './SpecificRiverHeaderImage'
import { SpecificRiverHeaderName } from './SpecificRiverHeaderName'
import { SpecificRiverHeaderText } from './SpecificRiverHeaderText'

interface RiverPageProps {
  river: RiverDTO
}

export function SpecificRiverHeader({ river }: RiverPageProps) {
  const description = river.description ?? ''
  const name = river.name
  const url = river.featuredImage?.url
  return (
    <SpecificRiverHeaderBackground>
      <section>
        <BackButton />
        <SpecificRiverHeaderName name={name} />
      </section>
      <section className="flex">
        <SpecificRiverHeaderText description={description} />
        <div className="mt-16 ml-20 flex h-107 w-full flex-col gap-11">
          <GradeBadge
            grade={river.grade}
            className="h-15 w-46 rounded-[100px] text-[28px]"
          />
          {url && <SpecificRiverHeaderImage url={url} />}
        </div>
      </section>
    </SpecificRiverHeaderBackground>
  )
}
