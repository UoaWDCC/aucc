import { VideoHighlightCard } from './VideoHighlightCard'
import { VideoHighlightsCurve } from './VideoHighlightsCurve'

export function VideoHighlightSection() {
  return (
    <section className="relative bg-[#89ACAD] px-6 pt-12 pb-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex justify-center md:justify-end">
          <h2 className="text-center text-3xl font-extrabold tracking-widest text-white md:text-4xl">
            VIDEO
            <br />
            HIGHLIGHTS
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <VideoHighlightCard />
          <VideoHighlightCard />
          <VideoHighlightCard />
        </div>
      </div>
    </section>
  )
}
