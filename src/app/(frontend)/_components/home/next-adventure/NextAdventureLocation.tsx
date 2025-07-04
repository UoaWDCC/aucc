import { MapPin } from 'lucide-react'

type LocationProps = {
  children: React.ReactNode
}

export function NextAdventureLocation({ children }: LocationProps) {
  return (
    <div className="flex w-full">
      <MapPin
        className="inline-block [transform:skewX(-10deg)]"
        size={20}
        color="#EFEFE1"
      />
      <p className="font-body w-full text-left italic">{children}</p>
    </div>
  )
}
