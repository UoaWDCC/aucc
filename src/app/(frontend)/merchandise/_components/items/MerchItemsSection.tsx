import { RichText } from '@/components/RichText/RichText'
import type { MerchGlobalDTO } from '@/queries/merch-global'
import { MerchItemCard } from './MerchItemCard'

type MerchItemsSectionProps = {
  items: MerchGlobalDTO['items']
}

export function MerchItemsSection({ items }: MerchItemsSectionProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-24">
      {items.map((item) => {
        const image = typeof item.image === 'object' ? item.image : undefined

        return (
          <MerchItemCard
            key={item.id ?? item.heading}
            heading={item.heading}
            body={item.body ? <RichText data={item.body} /> : undefined}
            imageSrc={image?.url ?? ''}
            imageAlt={image?.alt ?? item.heading}
            variant={item.variant}
            calloutLabels={item.calloutLabels ?? undefined}
          />
        )
      })}
    </section>
  )
}
