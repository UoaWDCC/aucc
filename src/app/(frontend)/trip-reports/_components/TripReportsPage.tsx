import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { Media } from '@/payload-types'
import type { TripReportDTO } from '@/queries/trip-reports'
import TripReportsGrid from './grid/TripReportsGrid'
import TripReportsGridBackground from './grid/TripReportsGridBackground'
import { TripreportsHeaderSection } from './header/TripReportsHeaderSection'
import { TripReportsIntroSection } from './TripReportsIntroSection'

type TripReportsPageProps = {
  tripReports: TripReportDTO[]
  headerImage: Media
  introText: SerializedEditorState
}

export function TripReportsPage({
  tripReports,
  headerImage,
  introText,
}: TripReportsPageProps) {
  return (
    <>
      <TripreportsHeaderSection headerImage={headerImage} />
      <TripReportsIntroSection introText={introText} />
      <TripReportsGridBackground>
        <TripReportsGrid tripReports={tripReports} />
      </TripReportsGridBackground>
    </>
  )
}
