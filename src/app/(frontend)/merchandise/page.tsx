import { RichText } from '@/components/RichText/RichText'
import { getMerchGlobal } from '@/queries/merch-global'
import { MerchandisePage } from './_components/MerchandisePage'
import { MerchItemCard } from './_components/MerchItemCard'

export default async function MerchPage() {
  const merch = await getMerchGlobal()

  return (
    <>
      <MerchandisePage />

      <section className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-24">
        {merch.items?.map((item) => {
          const image = typeof item.image === 'object' ? item.image : undefined

          return (
            <MerchItemCard
              key={item.id ?? item.heading}
              heading={item.heading}
              body={item.body ? <RichText data={item.body} /> : undefined}
              imageSrc={image?.url ?? ''}
              imageAlt={image?.alt ?? item.heading}
              variant={item.variant}
            />
          )
        })}
      </section>
    </>
  )
}
