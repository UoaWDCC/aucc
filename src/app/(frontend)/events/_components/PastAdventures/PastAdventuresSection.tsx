import Image from 'next/image'

import image from '@/assets/canoe.webp'

export function PastAdventuresSection() {
  return (
    <div className="bg-abyss mt-31 h-auto w-full">
      <div className="flex w-full items-center justify-center gap-6">
        <div className="bg-cream h-[1.3px] flex-grow"></div>
        <h1 className="text-cream font-heading text-5xl tracking-tighter">
          Past Adventures
        </h1>
        {/* <Image src={image} alt="Canoe Image" /> */}
      </div>
    </div>
  )
}
