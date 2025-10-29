import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { Media } from '@/payload-types'
import { GeneralHireSection } from './general-hire/GeneralHireSection'
import { GearHireHeaderSection } from './header/GearHireHeaderSection'
import { HiringProcedureSection } from './hiring-procedure/HiringProcedure'
import { PaymentMethods } from './payment-method/PaymentMethods'
import { RestrictedHireSection } from './restricted-hire/RestrictedHireSection'

type GearHirePageProps = {
  headerImage: Media
  introText: SerializedEditorState
}

export function GearHirePage({ headerImage, introText }: GearHirePageProps) {
  return (
    <div>
      <GearHireHeaderSection headerImage={headerImage} />
      <div className="bg-grass h-full min-h-600">
        <HiringProcedureSection introText={introText} />
        <GeneralHireSection />
        <RestrictedHireSection />
        <PaymentMethods />
      </div>
    </div>
  )
}
