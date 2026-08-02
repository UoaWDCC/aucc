import { getEventSpotlight } from '@/queries/event-spotlight'
import { GalleryPage } from './_components/GalleryPage'

export default async function Page() {
  const eventSpotlight = await getEventSpotlight()

  return <GalleryPage eventSpotlight={eventSpotlight} />
}
