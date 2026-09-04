import { Suspense } from 'react'

import { EventsPageContent } from './EventsPageContent'
import { EventsPageSkeleton } from './EventsPageSkeleton'

export default function Page() {
  return (
    <Suspense fallback={<EventsPageSkeleton />}>
      <EventsPageContent />
    </Suspense>
  )
}
