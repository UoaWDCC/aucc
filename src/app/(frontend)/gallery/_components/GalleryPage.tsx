import { GalleryHeaderSection } from './header/GalleryHeaderSection'
import { GallerySpotlightSection } from './gallery-spotlight/GallerySpotlightSection'
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
