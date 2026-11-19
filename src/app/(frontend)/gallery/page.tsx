import { buildPageMetadata, headerImageOf } from '@/lib/page-metadata'
import { getEventSpotlight } from '@/queries/event-spotlight'
import { getGalleryGlobal } from '@/queries/gallery-global'
import { GalleryPage } from './_components/GalleryPage'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Gallery',
    description:
      'Photos and videos from AUCC trips, pool training and club events.',
    path: '/gallery',
    image: await headerImageOf(getGalleryGlobal),
  })
}

export default async function Page() {
  const eventSpotlight = await getEventSpotlight()

  return <GalleryPage eventSpotlight={eventSpotlight} />
}
