import Image from 'next/image'

export function MerchandisePage() {
  return (
    <main>
      <section className="relative h-[540px] w-full overflow-hidden md:h-[700px]">
        <Image
          src="/images/merch-hero.png"
          alt="Kayaker paddling through white water"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#90A1A5]/0 from-[27%] to-[#011006] to-[88%] opacity-80" />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="flex flex-col items-start">
            <h1 className="font-heading text-7xl leading-none text-[#EFEDE3] sm:text-8xl md:text-[140px]">
              MERCH
            </h1>

            <p className="mt-1 translate-x-1 text-sm text-[#EFEDE3] italic md:text-base">
              Past AUCC merchandise!
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
