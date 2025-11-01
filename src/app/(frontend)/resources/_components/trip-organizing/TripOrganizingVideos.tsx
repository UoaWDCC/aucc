export function TripOrganizingVideos() {
  return (
    <div className="mt-14 flex w-full flex-col items-center justify-center">
      <h2 className="text-cream font-heading text-center text-lg">
        VIDEOS ON LEARNING TO ROLL
      </h2>
      <div className="mt-9 flex gap-5">
        <iframe
          className="h-69 w-97"
          src="https://www.youtube.com/embed/v-riOC8poAs"
          title="How to Roll a Kayak"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <iframe
          className="h-69 w-97"
          src="https://www.youtube.com/embed/szSp03Dr3zo"
          title="AUCC twist and sweep roll homework video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  )
}
