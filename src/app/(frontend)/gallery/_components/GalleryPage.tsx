import { Media } from '@/payload-types'
import { GallerySubheading } from './gallery-images/GallerySubheading'
import { GallerySpotlightSection } from './gallery-spotlight/GallerySpotlightSection'
import { GalleryHeaderSection } from './header/GalleryHeaderSection'
import { VideoHighlightSection } from './video-highlights/VideoHighlightSection'

type GalleryPageProps = {
  headerImage: Media | null
}

export function GalleryPage({ headerImage }: GalleryPageProps) {
  return (
    <>
      <GalleryHeaderSection headerImage={headerImage} />
      <GallerySpotlightSection />
      <VideoHighlightSection />
      <GallerySubheading />
    </>
  )
}
