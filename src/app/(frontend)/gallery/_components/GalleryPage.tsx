import config from '@payload-config'
import { getPayload } from 'payload'

import { GallerySubheading } from './gallery-images/GallerySubheading'
import { GallerySpotlightSection } from './gallery-spotlight/GallerySpotlightSection'
import { GalleryHeaderSection } from './header/GalleryHeaderSection'
import { VideoHighlightSection } from './video-highlights/VideoHighlightSection'

export async function GalleryPage() {
  const payload = await getPayload({ config })

  const gallerySettings = await payload.findGlobal({
    slug: 'gallery-settings',
  })

  return (
    <>
      <GalleryHeaderSection headerImage={gallerySettings.headerImage} />
      <GallerySpotlightSection />
      <VideoHighlightSection />
      <GallerySubheading />
    </>
  )
}
