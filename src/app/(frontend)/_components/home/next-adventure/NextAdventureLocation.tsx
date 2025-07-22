import { MapPin } from 'lucide-react'

type LocationProps = {
  children: React.ReactNode
}

export function NextAdventureLocation({ children }: LocationProps) {
  return (
    <div className="flex w-full md:mb-5 lg:mb-[18px]">
      <MapPin className="lg inline-block h-5 w-5 text-[#EFEFE1] md:h-[11px] md:w-[11px] lg:h-5 lg:w-5" />
      <p className="font-body w-full text-left text-sm italic md:text-[9px] lg:text-sm">
        {children}
      </p>
    </div>
  )
}
