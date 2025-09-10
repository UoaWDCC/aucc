import type { River } from '@/payload-types'
import { RiverGallerySection } from './SpecificRiverGallery/RiverGallerySection'

interface RiverPageProps {
  river: River
}

export function RiverPage({ river }: RiverPageProps) {
  const slug = typeof river.slug === 'string' ? river.slug : ''
  return <>{slug && <RiverGallerySection slug={slug} />}</>
}
