import { GallerySpotlightSection } from './gallery-spotlight/GallerySpotlightSection'
import { VideoHighlightSection } from './video-highlights/VideoHighlightSection'

export function GalleryPage() {
  return (
    <div>
      <GallerySpotlightSection />
      <VideoHighlightSection />
    </div>
  )
}
