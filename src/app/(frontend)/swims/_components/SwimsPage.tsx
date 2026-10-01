import { SwimsFormSection } from './form/SwimsFormSection'
import type { RiverOption } from './form/SwimsLogForm'
import { SwimsHeaderSection } from './header/SwimsHeaderSection'

interface SwimsPageProps {
  rivers: RiverOption[]
}

export function SwimsPage({ rivers }: SwimsPageProps) {
  return (
    <>
      <SwimsHeaderSection />
      <SwimsFormSection rivers={rivers} />
    </>
  )
}
