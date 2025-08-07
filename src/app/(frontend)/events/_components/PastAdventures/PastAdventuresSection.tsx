import Image from 'next/image'

import image from '@/assets/kayak.webp'

export function PastAdventuresSection() {
  return (
    <div className="bg-abyss mt-31 h-auto w-full">
      <div className="flex w-full items-center">
        <div className="bg-cream h-[1.3px] flex-grow lg:pl-[339px]"></div>

        <h1 className="text-cream font-heading px-6 text-5xl tracking-tighter">
          Past Adventures
        </h1>
        <div className="bg-cream h-[1.3px] flex-grow"></div>
        <Image src={image} alt="Kayak Image" className="h-auto w-auto" />
      </div>
    </div>
  )
}
