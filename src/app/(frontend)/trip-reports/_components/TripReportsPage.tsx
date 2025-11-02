import { Suspense } from 'react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { Media } from '@/payload-types'
import TripReportsGrid from './grid/TripReportsGrid'
import TripReportsGridBackground from './grid/TripReportsGridBackground'
import { TripReportsGridFallback } from './grid/TripReportsGridFallback'
import { TripReportsHeaderSection } from './header/TripReportsHeaderSection'
import { TripReportsIntroSection } from './TripReportsIntroSection'

type TripReportsPageProps = {
  headerImage: Media
  introText: SerializedEditorState
}

export function TripReportsPage({
  headerImage,
  introText,
}: TripReportsPageProps) {
  return (
    <>
      <TripReportsHeaderSection headerImage={headerImage} />
      <TripReportsIntroSection introText={introText} />
      <TripReportsGridBackground className="px-4 md:px-8">
        <Suspense fallback={<TripReportsGridFallback />}>
          <TripReportsGrid />
        </Suspense>
      </TripReportsGridBackground>
    </>
  )
}
