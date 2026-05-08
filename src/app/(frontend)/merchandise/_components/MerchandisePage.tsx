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
          className="object-cover object-top brightness-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#26342c] from-10% to-[#90A1A5]/15 opacity-75" />

        <div className="absolute inset-0 z-10 mt-8 flex items-center justify-center px-4 md:mt-0">
          <div className="flex flex-col items-start">
            <h1 className="font-heading text-4xl leading-none text-[#EFEDE3] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[140px]">
              MERCH
            </h1>

            <p className="mt-1 translate-x-2 text-[10px] text-[#EFEDE3] italic md:text-base">
              Past AUCC merchandise!
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
