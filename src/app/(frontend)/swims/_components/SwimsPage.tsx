import { getApprovedSwims } from '@/queries/swims'
import { SwimsFormSection } from './form/SwimsFormSection'
import { SwimsHeaderSection } from './header/SwimsHeaderSection'
import { SwimsList } from './SwimsList'

export async function SwimsPage() {
  const { swims: approvedSwims } = await getApprovedSwims({ withImage: true })

  return (
    <main>
      <SwimsHeaderSection />
      <SwimsList swims={[]} />
      <SwimsFormSection approvedPhotos={approvedSwims} />
    </main>
  )
}
