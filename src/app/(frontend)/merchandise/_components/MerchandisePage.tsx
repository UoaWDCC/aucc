import Image from 'next/image'

export function MerchandisePage() {
  return (
    <main>
      <section className="relative aspect-[128/57] w-full overflow-hidden">
        <Image
          src="/images/merch-hero.png"
          alt="Kayaker paddling through white water"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#26342c] from-10% to-[#90A1A5]/0 opacity-80 brightness-90" />

        <div className="absolute top-[60%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 px-4 sm:top-[50%] md:top-[50%] lg:top-[45%]">
          <div className="flex flex-col items-start">
            <h1 className="font-heading text-3xl leading-none text-[#EFEDE3] min-[450px]:text-5xl sm:text-7xl md:text-8xl lg:text-[140px]">
              MERCH
            </h1>

            <p className="text-[8px] text-[#EFEDE3] italic sm:translate-x-1 sm:text-xs md:translate-x-2 md:text-base">
              Past AUCC merchandise!
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
