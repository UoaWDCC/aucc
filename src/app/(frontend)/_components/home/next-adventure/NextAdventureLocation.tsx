import { MapPin } from 'lucide-react'

type LocationProps = {
  children: React.ReactNode
}

export function NextAdventureLocation({ children }: LocationProps) {
  return (
    <div className="lg:mb-[18px flex w-full md:mb-5">
      <MapPin className="lg inline-block h-5 w-5 [transform:skewX(-10deg)] text-[#EFEFE1] md:h-[11px] md:w-[11px] lg:h-5 lg:w-5" />
      <p className="font-body md:text-[9px w-full text-left text-sm italic lg:text-sm">
        {children}
      </p>
    </div>
  )
}
