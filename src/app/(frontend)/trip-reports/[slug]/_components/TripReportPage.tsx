import { RichText } from '@payloadcms/richtext-lexical/react'

import { TripReport } from '@/payload-types'

export function TripReportPage({ tripReport }: { tripReport: TripReport }) {
  const date = tripReport?.tripDate
    ? new Date(tripReport.tripDate).toLocaleDateString()
    : ''
  return (
    <div className="m-25 mt-0 flex h-full w-auto flex-col bg-gray-100 p-15 pt-0">
      <div>
        <div>
          <h1 className="p-10 pb-5 pl-0 text-4xl font-bold">
            {tripReport.title}
          </h1>
          <div>
            <p className="text-2xl">Date: {date}</p>
            <p className="pt-2 text-2xl">
              Authors:{' '}
              {tripReport.author.map((author: any) => author.name).join(', ')}
            </p>
          </div>
        </div>
        <div className="w-full bg-white p-5">
          {tripReport.content && <RichText data={tripReport.content} />}
        </div>
      </div>
    </div>
  )
}
