import type { EventSpotlightDTO } from '@/queries/event-spotlight'
import { GallerySpotlightSection } from './events/GallerySpotlightSection'
import { GallerySubheading } from './gallery-images/GallerySubheading'
import { GalleryHeaderSection } from './header/GalleryHeaderSection'
import { VideoHighlightSection } from './video-highlights/VideoHighlightSection'

type GalleryPageProps = {
  eventSpotlight: EventSpotlightDTO | null
}

export function GalleryPage({ eventSpotlight }: GalleryPageProps) {
  return (
    <>
      <GalleryHeaderSection />
      {eventSpotlight ? (
        <GallerySpotlightSection
          eventLabel={eventSpotlight.eventLabel}
          spotlightImage={eventSpotlight.spotlightImage}
        />
      ) : null}
      <VideoHighlightSection />
      <GallerySubheading />
    </>
  )
}
