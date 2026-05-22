import { getGalleryGlobal } from '@/queries/gallery-global'
import { VideoHighlightCard } from './VideoHighlightCard'
import { VideoHighightsArrow } from './VideoHighlightsArrow'
import { VideoHighlightsCurve } from './VideoHighlightsCurve'

export async function VideoHighlightSection() {
  const data = await getGalleryGlobal()
  const video = data?.videoHighlights ?? []
  const videos = [0, 1, 2].map((i) => video[i]?.url)
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
          {videos.map((url, i) => (
            <VideoHighlightCard key={i} url={url} />
          ))}
        </div>
      </div>
    </section>
  )
}
