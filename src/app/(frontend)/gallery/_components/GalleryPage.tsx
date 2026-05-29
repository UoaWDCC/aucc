import { GallerySpotlightSection } from './events/GallerySpotlightSection'
import { GallerySubheading } from './gallery-images/GallerySubheading'
import { GalleryHeaderSection } from './header/GalleryHeaderSection'
import { VideoHighlightSection } from './video-highlights/VideoHighlightSection'

export function GalleryPage() {
  return (
    <>
      <GalleryHeaderSection />
      <GallerySpotlightSection />
      <VideoHighlightSection />
      <GallerySubheading />
    </>
  )
}
