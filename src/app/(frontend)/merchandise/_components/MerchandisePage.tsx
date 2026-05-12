import { HeaderBackground } from './HeaderBackground'

export function MerchandisePage() {
  return (
    <main>
      <section className="relative aspect-[128/57] w-full overflow-hidden">
        <HeaderBackground />

        <div className="absolute inset-x-0 top-[44%] z-10 flex justify-center px-4 min-[500px]:top-[36%] sm:top-[32%] md:top-[30%] lg:top-[28%]">
          <div className="flex flex-col items-start">
            <h1 className="font-heading text-4xl leading-none text-[#EFEDE3] min-[500px]:text-5xl sm:text-7xl md:text-8xl lg:text-[140px]">
              MERCH
            </h1>

            <p className="translate-x-[0.5em] text-[6px] font-light text-[#EFEDE3] italic min-[500px]:text-[9px] sm:text-xs md:text-sm lg:text-base">
              Past AUCC merchandise!
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
