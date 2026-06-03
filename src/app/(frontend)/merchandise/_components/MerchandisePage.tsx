import { MerchandiseHeaderSection } from './header/MerchandiseHeaderSection'
import { MerchandiseShowcaseSection } from './header/MerchandiseShowcaseSection'
import { MerchandiseFooterSection } from './footer/MerchandiseFooterSection'

export function MerchandisePage() {
  return (
    <>
      <MerchandiseHeaderSection />
      <MerchandiseShowcaseSection />
      <MerchandiseFooterSection />
    </>
  )
}
