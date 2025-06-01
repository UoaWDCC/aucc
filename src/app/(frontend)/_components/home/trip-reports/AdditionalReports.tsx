import Link from 'next/link'

import type { TripReport } from '@/payload-types'
import { SARButton } from './SARButton'

interface AdditionalReportsProps {
  tripReport: TripReport
}
export function AdditionalReports({ tripReport }: AdditionalReportsProps) {
  return (
    <div>
      <Link href="/trip-reports">
        <button>
          {tripReport.tripDate && <p>{tripReport.tripDate}</p>}
          <br />
          {tripReport.title && <p>{tripReport.title}</p>}
        </button>
      </Link>
      <div>
        <Link href="/trip-reports">
          <button>
            {tripReport.tripDate && <p>{tripReport.tripDate}</p>}
            <br />
            {tripReport.title && <p>{tripReport.title}</p>}
          </button>
        </Link>
        <SARButton />
      </div>
    </div>
  )
}
