import { MapPin } from 'lucide-react'

type LocationProps = {
  children: React.ReactNode
}

export function NextAdventureLocation({ children }: LocationProps) {
  return (
    <div className="flex w-full gap-1 md:mb-5">
      <MapPin className="text-cream inline-block size-5" />
      <p className="font-body w-full text-left text-sm italic md:text-sm">
        {children}
      </p>
    </div>
  )
}
