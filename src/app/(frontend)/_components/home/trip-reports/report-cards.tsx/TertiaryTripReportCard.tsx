import React from 'react'
import Image from 'next/image'

import { formatDate } from '@/lib/utils/formatDate'

const PLACEHOLDER = '/hero_background_Image.jpg'

export interface TripreportardProps {
  title: string
  tripDate: string
  coverImageURL: string
  content: string
}

export const TertiaryTripreportCard = ({
  report,
}: {
  report: TripreportardProps
}) => {
  return (
    <section>
      <div className="block md:hidden">
        <MobileTertiaryTripreportCard report={report} />
      </div>
      <div className="hidden md:block">
        <DesktopTabletTertiaryTripreportCard report={report} />
      </div>
    </section>
  )
}

const MobileTertiaryTripreportCard = ({
  report,
}: {
  report: TripreportardProps
}) => {
  return (
    <article className="flex flex-col rounded-2xl">
      <div className="relative aspect-[16/9] h-31.5 w-full overflow-hidden rounded-lg">
        <Image
          src={report.coverImageURL ?? PLACEHOLDER}
          alt={report.title ?? 'Trip cover image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/20 via-60% to-transparent to-80%"></div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end px-3 py-2">
          <div className="text-cream flex flex-col">
            <time className="text-xs italic">
              {formatDate(report.tripDate)}
            </time>

            <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
              {report.title}
            </h4>
          </div>
        </div>
      </div>
    </article>
  )
}

const DesktopTabletTertiaryTripreportCard = ({
  report,
}: {
  report: TripreportardProps
}) => {
  return (
    <div className="group relative col-span-2 row-span-2 h-full w-full">
      <article className="relative flex flex-col rounded-2xl">
        {/* Default view*/}
        <div className="relative aspect-[16/9] h-41 w-full overflow-hidden rounded-lg transition-opacity duration-300 lg:opacity-100 lg:hover:opacity-0">
          <div className="bg-abyss absolute inset-0" />
          <div className="absolute inset-0 z-10 flex flex-col justify-end px-7 py-6">
            <p className="from-cream/90 via-cream/65 to-cream/30 line-clamp-3 flex flex-grow justify-start bg-gradient-to-b bg-clip-text text-sm leading-5.5 text-transparent italic">
              {report.content}
            </p>
            <div className="text-cream flex flex-col">
              <time className="text-xs italic">
                {formatDate(report.tripDate)}
              </time>
              <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
                {report.title}
              </h4>
            </div>
          </div>
        </div>
      </article>

      {/* Hover view */}
      <article className="absolute inset-0 z-20 flex transform flex-col overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:scale-103">
        <Image
          src={report.coverImageURL ?? PLACEHOLDER}
          alt={report.title ?? 'Trip cover image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/20 via-60% to-transparent to-80%" />
        <div className="text-cream absolute inset-0 z-10 flex flex-col justify-end px-7 py-6">
          <time className="text-xs italic">{formatDate(report.tripDate)}</time>
          <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
            {report.title}
          </h4>
        </div>
      </article>
    </div>
  )
}
