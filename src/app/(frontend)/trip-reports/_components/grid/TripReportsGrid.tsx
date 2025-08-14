import { TripReportDTO } from '@/queries/trip-reports'
import TripReportGridCard from './TripReportGridCard'

type TripReportsGridProps = {
  tripReports: TripReportDTO[]
}

export default function TripReportsGrid({ tripReports }: TripReportsGridProps) {
  if (!tripReports.length) {
    return (
      <div className="mx-4 pb-20 md:mx-20 lg:mx-28 xl:mx-auto xl:max-w-[1200px]">
        <div className="py-20 text-center">
          <h3 className="text-cream font-heading mb-4 text-2xl">
            No trip reports yet
          </h3>
          <p className="text-cream/80 text-lg">
            Check back soon for exciting adventure stories!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center py-30">
      <div className="grid w-210 grid-cols-2 gap-8">
        {tripReports.map((tripReport) => (
          <TripReportGridCard key={tripReport.id} tripReport={tripReport} />
        ))}
      </div>
    </div>
  )
}
