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
  const hasImage = river.featuredImage?.url

  return (
    <div className="group bg-abyss text-cream hover:shadow-abyss/20 relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col">
        {/* Grade Badge Section */}
        {riverGrade && (
          <div className="w- p-4 pb-0 md:p-6 md:pb-0">
            <GradeBadge grade={riverGrade} className="w-fit" />
          </div>
        )}

        {/* Image and Content Row */}
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative p-4 pt-3 md:w-2/5 md:p-6 md:pt-3 lg:w-1/3">
            {hasImage ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-auto md:h-48 lg:h-56">
                <Image
                  src={river.featuredImage!.url!}
                  alt={river.name ?? 'River image'}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 33vw"
                />
                <div className="from-abyss/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent md:bg-gradient-to-r" />
              </div>
            ) : (
              <div className="bg-abyss/50 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl md:aspect-auto md:h-48 lg:h-56">
                <div className="text-cream/40 text-center">
                  <svg
                    className="mx-auto mb-2 h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">No image available</p>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col p-6 pt-3 md:p-8 md:pt-3">
            {/* Header */}
            <h2 className="font-heading mb-4 text-xl leading-tight md:text-2xl">
              {river.name ?? 'Unnamed river'}
            </h2>

            {/* Description - expands to fill available space */}
            <div className="mb-6 flex-1">
              <p className="font-body text-cream/90 line-clamp-4 text-sm leading-relaxed italic md:text-base">
                {river.description ?? 'No description available.'}
              </p>
            </div>

            {/* Bottom section - Location and Button */}
            <div className="space-y-4">
              <RiverCardLocation>
                {river.location ?? 'Unknown location'}
              </RiverCardLocation>

              <div className="flex justify-end">
                <RiverCardButtons riverSlug={river.slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
