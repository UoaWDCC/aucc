import imagePlaceholder from '@/assets/tshirt-image.png'
import { MerchandisePage } from './_components/header/MerchandiseHeaderSection'
import { MerchItemCard } from './_components/MerchItemCard'

export default function MerchPage() {
  return (
    <div>
      <MerchandisePage />
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-12">
        <MerchItemCard
          variant="image-left"
          className="bg-white"
          heading="T-Shirts"
          imageSrc={imagePlaceholder}
        />
        <MerchItemCard
          variant="image-right"
          className="bg-white"
          heading="Stickers"
          imageSrc={imagePlaceholder}
          body={
            "If you're interested contact our media officers at social@aucc.org.nz for details." as any
          }
        />
        <MerchItemCard
          variant="image-with-caption"
          className="bg-[#7F9F66]"
          heading="More Towel Ponchos!"
          imageSrc={imagePlaceholder}
        />
      </div>
    </div>
  )
}
