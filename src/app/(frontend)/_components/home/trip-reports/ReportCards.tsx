import React from 'react'
import Image from 'next/image'

import { formatDate } from '@/lib/utils/formatDate'
import { getPlainText } from '@/lib/utils/get-plain-text'
import { getTripReports, type TripReportDTO } from '@/queries/trip-reports'

const PLACEHOLDER = '/hero_background_Image.jpg'
const { tripReports } = await getTripReports({
  page: 1,
  limit: 3,
  sort: '-tripDate',
})

const [reportA, reportB, reportC] = tripReports.map((report) => ({
  title: report.title,
  tripDate: report.tripDate ?? '',
  coverImageURL: report.coverImage?.url ?? PLACEHOLDER,
  content: getPlainText(report.content),
}))

export async function MobileMainReport() {
  return (
    <article className="to-abyss col-span-2 flex flex-col rounded-2xl bg-gradient-to-t from-[#343E3B] to-30% p-4">
      <h3 className="text-cream font-heading mt-2 mb-1 line-clamp-2 text-2xl tracking-tighter">
        {reportA.title}
      </h3>
      <time className="text-cream mb-4 text-sm italic">
        {formatDate(reportA.tripDate)}
      </time>
      <div className="grid h-40 grid-cols-2 items-start gap-4">
        <div className="relative mb-4 aspect-[4/3] h-40 w-full gap-4 overflow-hidden rounded-lg">
          <Image
            src={reportA.coverImageURL ?? PLACEHOLDER}
            alt={reportA.title}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-cream/80 line-clamp-7 flex-grow text-sm leading-5.5 italic">
          {reportA.content}
        </p>
      </div>
    </article>
  )
}

export async function MobileSmallReport1() {
  return (
    <article className="flex flex-col rounded-2xl">
      <div className="relative aspect-[16/9] h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={reportB.coverImageURL ?? PLACEHOLDER}
          alt={reportB.title ?? 'Trip cover image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/50 via-60% to-transparent to-80%"></div>
        <div className="text-cream absolute inset-0 z-1 flex flex-col justify-end px-3 py-2">
          <time className="text-xs italic">{formatDate(reportB.tripDate)}</time>

          <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
            {reportB.title}
          </h4>
        </div>
      </div>
    </article>
  )
}

export async function MobileSmallReport2() {
  return (
    <article className="flex flex-col rounded-2xl">
      <div className="relative aspect-[16/9] h-31.5 w-full overflow-hidden rounded-lg">
        <Image
          src={reportC.coverImageURL ?? PLACEHOLDER}
          alt={reportC.title ?? 'Trip cover image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/20 via-60% to-transparent to-80%"></div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end px-3 py-2">
          <div className="text-cream flex flex-col">
            <time className="text-xs italic">
              {formatDate(reportC.tripDate)}
            </time>

            <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
              {reportC.title}
            </h4>
          </div>
        </div>
      </div>
    </article>
  )
}

export async function DesktopTabletMainReport() {
  return (
    <div className="group relative col-span-2 row-span-2 h-full w-full">
      {/* Default view */}
      <article className="to-abyss col-span-2 flex h-93.25 flex-col rounded-2xl bg-gradient-to-t from-[#343E3B] to-30% p-4 lg:absolute lg:inset-0 lg:z-10 lg:opacity-100 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-0">
        <h3 className="text-cream font-heading mt-2 mb-1 line-clamp-2 px-4 pt-8 text-2xl tracking-tighter">
          {reportA.title}
        </h3>
        <time className="text-cream mt-1 mb-7 px-5 text-sm italic">
          {formatDate(reportA.tripDate)}
        </time>
        <div className="grid h-40 grid-cols-1 items-start gap-4">
          <div className="relative mb-4 aspect-[4/3] h-40 w-full gap-4 overflow-hidden rounded-lg md:hidden">
            <Image
              src={reportA.coverImageURL ?? PLACEHOLDER}
              alt={reportA.title}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-cream/80 flex-grow px-5 text-sm leading-5.5 italic md:line-clamp-8">
            {reportA.content}
          </p>
        </div>
      </article>

      {/* Hover view */}
      <article className="absolute inset-0 z-20 flex transform flex-col overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:scale-102">
        <Image
          src={reportA.coverImageURL ?? PLACEHOLDER}
          alt={reportA.title ?? 'Trip cover image'}
          fill
          className="z-0 object-cover"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1E2A29] to-[#5E665E]/0" />
        <div className="relative z-20 flex flex-col p-5">
          <h3 className="text-cream font-heading mt-2 mb-1 line-clamp-2 px-4 pt-8 text-2xl tracking-tighter">
            {reportA.title}
          </h3>
          <time className="text-cream mt-1 mb-7 px-5 text-sm italic">
            {formatDate(reportA.tripDate)}
          </time>
          <p className="line-clamp-8 text-sm leading-5.5 text-transparent italic">
            {reportA.content}
          </p>
        </div>
      </article>
    </div>
  )
}

export async function DesktopTabletSmallReport1() {
  return (
    <div className="group relative col-span-2 row-span-2 h-full w-full">
      <article className="relative flex flex-col rounded-2xl">
        {/* Default view */}
        <div className="relative aspect-[16/9] h-50 w-full overflow-hidden rounded-lg transition-opacity duration-300 lg:opacity-100 lg:hover:opacity-0">
          <Image
            src={reportB.coverImageURL ?? PLACEHOLDER}
            alt={reportB.title ?? 'Trip cover image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/50 via-60% to-transparent to-80%" />
          <div className="text-cream absolute inset-0 z-10 flex flex-col justify-end px-7 py-6">
            <time className="text-xs italic">
              {formatDate(reportB.tripDate)}
            </time>
            <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
              {reportB.title}
            </h4>
          </div>
        </div>
      </article>

      {/* Hover view */}
      <article className="absolute inset-0 z-20 flex transform flex-col overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:scale-103">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#345C53] from-43% to-[#1E2A29] to-100%" />

        <div className="absolute inset-0 z-10 flex flex-col px-7 py-6">
          <p className="from-cream/90 via-cream/65 to-cream/30 line-clamp-4 flex-grow bg-gradient-to-b bg-clip-text text-sm leading-5.5 text-transparent italic">
            {reportB.content}
          </p>
          <div className="text-cream flex flex-col justify-end">
            <time className="text-xs italic">
              {formatDate(reportB.tripDate)}
            </time>
            <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
              {reportB.title}
            </h4>
          </div>
        </div>
      </article>
    </div>
  )
}

export async function DesktopTabletSmallReport2() {
  return (
    <div className="group relative col-span-2 row-span-2 h-full w-full">
      <article className="relative flex flex-col rounded-2xl">
        {/* Default view*/}
        <div className="relative aspect-[16/9] h-41 w-full overflow-hidden rounded-lg transition-opacity duration-300 lg:opacity-100 lg:hover:opacity-0">
          <div className="bg-abyss absolute inset-0" />
          <div className="absolute inset-0 z-10 flex flex-col justify-end px-7 py-6">
            <p className="from-cream/90 via-cream/65 to-cream/30 line-clamp-3 flex flex-grow justify-start bg-gradient-to-b bg-clip-text text-sm leading-5.5 text-transparent italic">
              {reportC.content}
            </p>
            <div className="text-cream flex flex-col">
              <time className="text-xs italic">
                {formatDate(reportC.tripDate)}
              </time>
              <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
                {reportC.title}
              </h4>
            </div>
          </div>
        </div>
      </article>

      {/* Hover view */}
      <article className="absolute inset-0 z-20 flex transform flex-col overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:scale-103">
        <Image
          src={reportC.coverImageURL ?? PLACEHOLDER}
          alt={reportC.title ?? 'Trip cover image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/20 via-60% to-transparent to-80%" />
        <div className="text-cream absolute inset-0 z-10 flex flex-col justify-end px-7 py-6">
          <time className="text-xs italic">{formatDate(reportC.tripDate)}</time>
          <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
            {reportC.title}
          </h4>
        </div>
      </article>
    </div>
  )
}
