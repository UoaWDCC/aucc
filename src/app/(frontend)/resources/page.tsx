import { getResourcesGlobal } from '@/queries/resources-global'
import { ResourcesPage } from './_components/ResourcesPage'

export default async function Page() {
  const { headerImage } = await getResourcesGlobal()
  return <ResourcesPage headerImage={headerImage} />
}
