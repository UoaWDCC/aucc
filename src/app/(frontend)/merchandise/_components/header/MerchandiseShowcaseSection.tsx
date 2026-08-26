export default function MerchandiseShowcaseSection() {
  return (
    <section className="relative min-h-[35.6vw] w-full overflow-hidden bg-[#1E2A29] text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[15%] left-1/2 aspect-square w-[112.5%] -translate-x-1/2 rounded-full bg-[#D3E2DA] sm:top-[12%] sm:w-[110%]"
      />

      <div className="relative z-10 mx-auto max-w-[16rem] px-4 pt-[10%] pb-[4%] sm:max-w-[24rem] sm:pt-[12%] sm:pb-[8%] md:max-w-[30rem] xl:max-w-[36rem]">
        <h2 className="mb-2 text-2xl font-black tracking-tight text-[#89ACAD] sm:mb-3 sm:text-3xl md:mb-4 md:text-4xl lg:text-[42px] xl:text-5xl">
          SHOWCASE
        </h2>

        <p className="text-[0.5rem] text-[#1E2A29] italic sm:text-[0.625rem] md:text-xs lg:text-sm">
          AUCC has its own merchandise that members can order. Merchandise
          includes T-shirts, hoodies, towel ponchos, board shorts &amp;
          stickers. New designs are made almost every year and members can
          submit designs for suggestions. Show your support by wearing our very
          own brand to our events!
        </p>
      </div>
    </section>
  )
}
