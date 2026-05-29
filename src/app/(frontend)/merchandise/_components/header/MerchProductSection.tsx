import { MerchItemCard } from './MerchItemCard'

type Product = {
  productName: string
  price?: string
  image?: {
    url?: string
  }
}

type Section = {
  title: string
  description?: string
  products?: Product[]
}

type Props = {
  sections?: Section[]
}

export function MerchProductSection({ sections }: Props) {
  return (
    <div className="space-y-20 px-6 py-20">
      {sections?.map((section) => (
        <section key={section.title} className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold">{section.title}</h2>

            {section.description && (
              <p className="mt-2 text-gray-400">{section.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {section.products?.map((product) => (
              <MerchItemCard
                key={product.productName}
                title={product.productName}
                price={product.price}
                image={product.image?.url}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
