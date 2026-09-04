import { SwimsHeaderSection } from './header/SwimsHeaderSection'
import { SwimsList } from './SwimsList'

export function SwimsPage() {
  // TODO: replace [] with real data once the swims query/collection
  // is wired up (fetch happens in page.tsx per Server Component
  // convention, then gets passed down as a prop — see events/ for
  // reference pattern).
  return (
    <main>
      <SwimsHeaderSection />
      <SwimsList swims={[]} />
    </main>
  )
}
