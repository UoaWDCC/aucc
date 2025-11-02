import { cn } from '@/lib/utils/cn'
import { getTripReports } from '@/queries/trip-reports'
import TripReportGridCard from './TripReportGridCard'

export default async function TripReportsGrid() {
  const { tripReports } = await getTripReports({ depth: 1 })
  if (!tripReports.length) {
    return (
      <div className="mx-4 pb-20 md:mx-20 lg:mx-28 xl:mx-auto xl:max-w-[1200px]">
        <div className="py-20 text-center">
          <h3 className="text-abyss font-heading mb-4 text-2xl">
            No trip reports yet
          </h3>
          <p className="text-abyss/80 text-lg">
            Check back soon for exciting adventure stories!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-200 py-20 md:mx-auto">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
        {tripReports.map((tripReport, index) => (
          <TripReportGridCard
            key={index}
            tripReport={tripReport}
            className={cn(
              index % 2 === 0 &&
                tripReports[index + 1] === undefined &&
                'md:col-span-2',
            )}
          />
        ))}
      </div>
    </div>
  )
}
