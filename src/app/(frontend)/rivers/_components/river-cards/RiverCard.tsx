import Image from 'next/image'

import { GradeBadge } from '@/components/GradeBadge'
import { RiverDTO } from '@/queries/rivers'
import { RiverCardButtons } from './RiverCardButton'
import { RiverCardLocation } from './RiverLocation'

type RiverCardProps = {
  river: RiverDTO & {
    slug: string

    location?: string
  }
}
export function RiverCard({ river }: RiverCardProps) {
  const riverGrade = river.grade ?? null
  return (
    <div className="bg-abyss text-cream relative flex flex-col-reverse justify-center rounded-2xl px-5 py-9 md:mx-10 md:flex-row md:gap-24 md:px-16 lg:mx-30">
      <div className="flex flex-col">
        <div className="font-heading mb-3 w-28 text-xl">
          {riverGrade && <GradeBadge grade={riverGrade} />}
        </div>
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="flex md:w-[30%]">
            {river.featuredImage?.url && (
              <Image
                src={river.featuredImage.url}
                alt={river.name ?? 'River image'}
                className="h-65 w-full rounded-2xl object-cover md:h-full"
                width={200}
                height={200}
              />
            )}
          </div>
          <div className="flex md:w-[70%]">
            <div className="flex min-w-[280px] flex-col md:min-w-[420px] lg:min-w-[480px]">
              <h2 className="font-heading mb-4 text-xl">
                {river.name ?? 'Unnamed river'}
              </h2>
              <p className="font-body mb-8 line-clamp-6 text-sm italic">
                {river.description ?? 'No description available.'}
              </p>

              <RiverCardLocation>
                {river.location ?? 'Unknown location'}
              </RiverCardLocation>
            </div>
          </div>
        </div>
        <RiverCardButtons riverSlug={river.slug} />
      </div>
    </div>
  )
}
