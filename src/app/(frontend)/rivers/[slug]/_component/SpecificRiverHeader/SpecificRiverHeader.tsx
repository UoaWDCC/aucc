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
      <section className="flex w-full">
        <SpecificRiverHeaderText description={description} />
        <div className="mt-16 ml-[max(40px,10%)] flex h-107 w-[50%] min-w-100 flex-col gap-11">
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
