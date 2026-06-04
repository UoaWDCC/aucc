import { MerchandiseFooterSection } from './footer/MerchandiseFooterSection'
import { MerchandiseHeaderSection } from './header/MerchandiseHeaderSection'
import MerchandiseShowcaseSection from './header/MerchandiseShowcaseSection'

export function MerchandisePage() {
  return (
    <>
      <MerchandiseHeaderSection />
      <MerchandiseShowcaseSection />
      <MerchandiseFooterSection />
    </>
  )
}
