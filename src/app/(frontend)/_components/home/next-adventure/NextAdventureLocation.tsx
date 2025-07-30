import { MapPin } from 'lucide-react'

type LocationProps = {
  children: React.ReactNode
}

export function NextAdventureLocation({ children }: LocationProps) {
  return (
    <div className="flex w-full gap-1 md:mb-5">
      <MapPin className="inline-block h-5 w-5 text-[#EFEFE1] md:h-5 md:w-5 lg:h-5 lg:w-5" />
      <p className="font-body w-full text-left text-sm italic md:text-sm">
        {children}
      </p>
    </div>
  )
}
