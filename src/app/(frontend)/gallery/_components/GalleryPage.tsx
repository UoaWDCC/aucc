import { GallerySpotlightSection } from './events/GallerySpotlightSection'
import { GalleryHeaderSection } from './header/GalleryHeaderSection'
import { VideoHighlightSection } from './video-highlights/VideoHighlightSection'

export function GalleryPage() {
  return (
    <>
      <GalleryHeaderSection />
      <GallerySpotlightSection />
      <VideoHighlightSection />
    </>
  )
}
