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

export async function MainReportCard() {
  return (
    <article className="to-abyss col-span-2 flex flex-col rounded-2xl bg-gradient-to-t from-[#343E3B] to-30% p-4 lg:row-span-2 lg:hover:hidden">
      <h3 className="text-cream font-heading mt-2 mb-1 line-clamp-2 text-2xl tracking-tighter md:px-4 md:pt-8">
        {reportA.title}
      </h3>
      <time className="text-cream mb-4 text-sm italic md:mt-1 md:mb-7 md:px-5">
        {formatDate(reportA.tripDate)}
      </time>
      <div className="grid h-40 grid-cols-2 items-start gap-4 md:grid-cols-1">
        <div className="relative mb-4 aspect-[4/3] h-40 w-full gap-4 overflow-hidden rounded-lg md:hidden">
          <Image
            src={reportA.coverImageURL ?? PLACEHOLDER}
            alt={reportA.title}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-cream/80 line-clamp-[7] flex-grow text-sm leading-5.5 italic md:line-clamp-[8] md:px-5">
          {reportA.content}
        </p>
      </div>
    </article>
  )
}

export async function MainReportCardHover() {
  return (
    <article className="relative row-span-2 flex flex-col overflow-hidden rounded-2xl">
      <Image
        src={reportA.coverImageURL ?? PLACEHOLDER}
        alt={reportA.title ?? 'Trip cover image'}
        fill
        className="z-0 object-cover"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1E2A29]/55 from-10% via-[#5E665E]/50 via-60% to-[#5E665E]/13 to-80%" />
      <div className="relative z-20 flex flex-col p-5">
        <h3 className="text-cream font-heading mt-2 mb-1 line-clamp-2 px-4 pt-8 text-2xl tracking-tighter">
          {reportA.title}
        </h3>
        <time className="text-cream mmb-11 mt-1 px-5 text-sm italic">
          {formatDate(reportA.tripDate)}
        </time>
        <p className="line-clamp-8 text-sm leading-5 text-transparent italic">
          {reportA.content}
        </p>
      </div>
    </article>
  )
}

export async function SmallReportCard1() {
  return (
    <article className="relative flex flex-col rounded-2xl">
      <div className="relative aspect-[16/9] h-48 w-full overflow-hidden rounded-lg md:h-50">
        <Image
          src={reportB.coverImageURL ?? PLACEHOLDER}
          alt={reportB.title ?? 'Trip cover image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/50 via-60% to-transparent to-80%"></div>
      </div>
      <div className="text-cream absolute inset-0 z-1 flex flex-col justify-end px-3 py-2">
        <time className="text-xs italic">{formatDate(reportB.tripDate)}</time>

        <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
          {reportB.title}
        </h4>
      </div>
    </article>
  )
}

export async function SmallReportCard2() {
  return (
    <article className="relative flex flex-col rounded-2xl">
      <div className="relative aspect-[16/9] h-31.5 w-full overflow-hidden rounded-lg md:h-41">
        <Image
          src={reportC.coverImageURL ?? PLACEHOLDER}
          alt={reportC.title ?? 'Trip cover image'}
          fill
          className="object-cover md:hidden"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242724]/80 from-10% via-[#578F8B]/20 via-60% to-transparent to-80% md:hidden"></div>
        <div className="md:bg-abyss absolute inset-0"></div>
        <div className="from-cream/90 via-cream/65 to-cream/30 line-clamp-[3] hidden bg-gradient-to-b bg-clip-text text-sm leading-5.5 text-transparent italic md:block md:flex-grow">
          {reportC.content}
        </div>
        <div className="text-cream absolute inset-0 z-1 flex flex-col justify-end px-3 py-2">
          <time className="text-xs italic">{formatDate(reportC.tripDate)}</time>

          <h4 className="font-heading line-clamp-2 text-xl tracking-tighter">
            {reportC.title}
          </h4>
        </div>
      </div>
    </article>
  )
}
