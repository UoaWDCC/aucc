'use client'

import { Media } from '@/payload-types'
import { GalleryHeaderSection } from './header/GalleryHeaderSection'

interface GalleryPageProps {
  headerImage: Media
}

export function GalleryPage({ headerImage }: GalleryPageProps) {
  return (
    <>
      <GalleryHeaderSection headerImage={headerImage} />
    </>
  )
}
