import { getApprovedSwimPhotos } from '@/queries/swims'
import { SwimsFormSection } from './form/SwimsFormSection'
import { SwimsHeaderSection } from './header/SwimsHeaderSection'
import { SwimsList } from './SwimsList'

export async function SwimsPage() {
  const approvedPhotos = await getApprovedSwimPhotos()

  return (
    <main>
      <SwimsHeaderSection />
      <SwimsList swims={[]} />
      <SwimsFormSection approvedPhotos={approvedPhotos} />
    </main>
  )
}
