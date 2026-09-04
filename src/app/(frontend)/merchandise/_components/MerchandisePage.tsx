import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { Media } from '@/payload-types'
import type { MerchGlobalDTO } from '@/queries/merch-global'
import { MerchandiseFooterSection } from './footer/MerchandiseFooterSection'
import { MerchandiseHeaderSection } from './header/MerchandiseHeaderSection'
import MerchandiseShowcaseSection from './header/MerchandiseShowcaseSection'
import { MerchItemsSection } from './items/MerchItemsSection'

type MerchandisePageProps = {
  headerImage: Media
  introText: SerializedEditorState
  items: MerchGlobalDTO['items']
}

export function MerchandisePage({
  headerImage,
  introText,
  items,
}: MerchandisePageProps) {
  return (
    <>
      <MerchandiseHeaderSection
        headerImage={headerImage}
        introText={introText}
      />
      <div className="bg-[#D3E2DA]">
        <MerchandiseShowcaseSection />
        <MerchItemsSection items={items} />
      </div>
      <MerchandiseFooterSection />
    </>
  )
}
