const VIDEOS = [
  { id: 'v-riOC8poAs', title: 'How to Roll a Kayak' },
  { id: 'szSp03Dr3zo', title: 'AUCC twist and sweep roll homework video' },
]

export function TripOrganizingVideos() {
  return (
    <div className="mt-14 flex w-full flex-col items-center px-6">
      <h2 className="text-cream font-heading text-center text-base md:text-lg">
        VIDEOS ON LEARNING TO ROLL
      </h2>
      <div className="mt-9 grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
        {VIDEOS.map((video) => (
          <iframe
            key={video.id}
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ))}
      </div>
    </div>
  )
}
