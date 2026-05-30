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

export function MerchProductSection({ sections = [] }: Props) {
  return (
    <div className="relative overflow-hidden bg-[#17322d] px-6 py-24 text-[#172926] md:px-12 lg:px-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#17322d]" />

        <div
          className="absolute top-[520px] left-0 h-[650px] w-full bg-[#24443e]"
          style={{
            clipPath: 'ellipse(120% 55% at 50% 0%)',
          }}
        />

        <div
          className="absolute top-[1050px] left-0 h-[650px] w-full bg-[#c7d8d4]"
          style={{
            clipPath: 'ellipse(120% 55% at 50% 0%)',
          }}
        />

        <div
          className="absolute top-[1550px] left-0 h-[650px] w-full bg-[#17322d]"
          style={{
            clipPath: 'ellipse(120% 55% at 50% 0%)',
          }}
        />
      </div>

      <div className="absolute top-[-120px] left-[-200px] h-[500px] w-[700px] rounded-full bg-[#c7d8d4]/40 blur-3xl" />

      <div className="absolute right-[-100px] bottom-[-200px] h-[500px] w-[700px] rounded-full bg-[#dfe8dc]/30 blur-3xl" />

      <div className="absolute inset-0 bg-[#17322d]" />

      <div className="absolute top-[420px] left-[-10%] h-[4000px] w-[120%] -rotate-1 rounded-t-[20%] bg-[#24443e]" />

      <div className="absolute top-[1100px] left-[-10%] h-[2000px] w-[120%] rotate-1 rounded-t-[30%] bg-[#c7d8d4]" />

      <div className="absolute top-[1750px] left-[-10%] h-[900px] w-[120%] -rotate-1 rounded-t-[20%] bg-[#17322d]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-40">
        {sections.slice(0, 10).map((section, index) => (
          <section
            key={section.title}
            className={`relative min-h-[650px] overflow-hidden rounded-[2rem] p-8 ${
              index === 0
                ? 'bg-[#dfe8dc]'
                : index === 1
                  ? 'bg-[#f3efe4]'
                  : index === 2
                    ? 'bg-[#c7d7b5]'
                    : index === 3
                      ? 'bg-[#d9e4dc]'
                      : 'bg-[#ccd8c1]'
            }`}
          >
            <div className="mb-10">
              <h2 className="text-xs font-black tracking-[0.25em] text-[#4f6b47] uppercase">
                {section.title}
              </h2>

              {section.description && (
                <p className="mt-3 max-w-xs text-xs text-[#172926]/70">
                  {section.description}
                </p>
              )}
            </div>

            <div className="relative min-h-[560px]">
              {section.products?.map((product, productIndex) => (
                <div
                  key={product.productName}
                  className={`absolute ${
                    section.products?.length === 1
                      ? 'top-10 left-1/2 w-[520px] -translate-x-1/2'
                      : section.products?.length === 2
                        ? productIndex === 0
                          ? 'top-0 left-0 w-[420px]'
                          : 'top-[220px] right-0 w-[420px]'
                        : productIndex === 0
                          ? 'top-0 left-0 w-[420px]'
                          : productIndex === 1
                            ? 'top-[280px] left-[220px] w-[360px]'
                            : 'top-[140px] right-0 w-[430px]'
                  }`}
                >
                  <MerchItemCard
                    title={product.productName}
                    price={product.price}
                    image={product.image?.url}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
