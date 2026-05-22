import { GallerySpotlightSection } from './gallery-spotlight/GallerySpotlightSection'
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
