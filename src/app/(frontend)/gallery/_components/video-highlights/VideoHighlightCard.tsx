import { toEmbedUrl } from '../../../../../lib/utils/toEmbedUrl'

interface VideoHighlightCardProps {
  url?: string
}

export function VideoHighlightCard({ url }: VideoHighlightCardProps) {
  const embedUrl = url ? toEmbedUrl(url) : undefined
  return (
    <div className="aspect-video w-full bg-[#D9D9D9]">
      {embedUrl && (
        <iframe
          src={embedUrl}
          title="Video highlight"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      )}
    </div>
  )
}
