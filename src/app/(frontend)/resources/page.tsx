import { getResourcesGlobal } from '@/queries/resources-global'
import { ResourcesPage } from './_components/ResourcesPage'

// TODO: Page is currently a work in progress
export default async function Page() {
  const { headerImage } = await getResourcesGlobal()
  return <ResourcesPage headerImage={headerImage} />
}
