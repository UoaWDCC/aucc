interface VideoHighlightCardProps {
  url?: string
}

export function VideoHighlightCard({ url }: VideoHighlightCardProps) {
  return (
    <div className="aspect-video w-full bg-[#D9D9D9]">
      {url && (
        <iframe
          src={url}
          title="Video highlight"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      )}
    </div>
  )
}
