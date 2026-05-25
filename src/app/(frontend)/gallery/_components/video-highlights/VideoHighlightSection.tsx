import { VideoHighlightCard } from './VideoHighlightCard'
import { VideoHighightsArrow } from './VideoHighlightsArrow'
import { VideoHighlightsCurve } from './VideoHighlightsCurve'

export function VideoHighlightSection() {
  return (
    <section className="relative w-full bg-[#89ACAD] px-6 pt-12 pb-20">
      <VideoHighlightsCurve />
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex justify-center md:justify-end md:gap-6">
          <VideoHighightsArrow className="mt-8 h-24 w-48" />
          <h2 className="text-right text-3xl font-extrabold tracking-wider text-[#EFEFE1] md:text-5xl">
            VIDEO
            <br />
            HIGHLIGHTS
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <VideoHighlightCard url="https://www.youtube.com/embed/dQw4w9WgXcQ?origin=http://localhost:3000" />
          <VideoHighlightCard url="https://player.vimeo.com/video/76979871" />
          <VideoHighlightCard /> {/* no url → grey placeholder */}
        </div>
      </div>
    </section>
  )
}
