import { MapPin } from 'lucide-react'

type LocationProps = {
  children: React.ReactNode
}

export function RiverCardLocation({ children }: LocationProps) {
  return (
    <div className="flex items-center gap-2">
      <MapPin className="text-algae h-4 w-4 flex-shrink-0" />
      <p className="font-body text-cream/80 text-sm font-medium">{children}</p>
    </div>
  )
}
