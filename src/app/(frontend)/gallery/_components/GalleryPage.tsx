import { EventSpotlightSection } from './events/EventSpotlightSection'
import { GalleryHeaderSection } from './header/GalleryHeaderSection'
import { VideoHighlightSection } from './video-highlights/VideoHighlightSection'

export function GalleryPage() {
  return (
    <>
      <GalleryHeaderSection />
      <EventSpotlightSection />
      <VideoHighlightSection />
    </>
  )
}
