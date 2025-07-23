import { MapPin } from 'lucide-react'

type LocationProps = {
  children: React.ReactNode
}

export function NextAdventureLocation({ children }: LocationProps) {
  return (
    <div className="flex w-full md:mb-5 lg:mb-5">
      <MapPin className="inline-block h-5 w-5 text-[#EFEFE1] md:h-3 md:w-3 lg:h-5 lg:w-5" />
      <p className="font-body w-full text-left text-sm italic md:text-[9px] lg:text-sm">
        {children}
      </p>
    </div>
  )
}
