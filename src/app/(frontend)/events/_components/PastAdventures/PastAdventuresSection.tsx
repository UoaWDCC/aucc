import Image from 'next/image'

import image from '@/assets/kayak.webp'

export function PastAdventuresSection() {
  return (
    <div className="bg-abyss mt-31 h-auto w-full">
      <div className="flex w-full items-center">
        <div className="bg-cream hidden h-[1.3px] flex-grow md:block xl:pl-[339px]"></div>

        <h1 className="text-cream font-heading px-6 text-5xl tracking-tighter whitespace-nowrap">
          Past Adventures
        </h1>
        <div className="bg-cream hidden h-[1.3px] flex-grow xl:block"></div>
        <Image
          src={image}
          alt="Kayak Image"
          className="hidden h-auto w-auto md:block"
        />
      </div>
    </div>
  )
}
