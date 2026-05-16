import { Media } from '@/payload-types'
import { GalleryHeaderSection } from './header/GalleryHeaderSection'

interface GalleryPageProps {
  headerImage: Media | null
}

export function GalleryPage({ headerImage }: GalleryPageProps) {
  if (!headerImage) return null

  return <GalleryHeaderSection headerImage={headerImage} />
}
