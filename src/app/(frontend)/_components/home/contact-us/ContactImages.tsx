import Image from 'next/image'

import { env } from '@/lib/env'

export function ContactImages() {
  return (
    <div className="relative mx-auto mt-28 h-auto max-w-140">
      <div className="relative h-[850px] w-full">
        <div className="absolute right-[0%] bottom-[50%] z-10 aspect-[4/3] h-auto w-[25%] overflow-hidden rounded-[16px]">
          <Image
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-01.v1.webp`}
            fill
            className="object-cover"
            alt="Looking picture 1"
          />
        </div>

        <div className="absolute top-[0%] right-[0%] z-10 aspect-[5/8] h-auto w-[42%] overflow-hidden rounded-[16px]">
          <Image
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-02.v1.webp`}
            fill
            className="object-cover"
            alt="Looking picture 2"
          />
        </div>

        <div className="absolute top-[22%] left-[46%] z-20 aspect-[2/3] h-auto w-[24%] overflow-hidden rounded-[16px]">
          <Image
            src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-03.v1.webp`}
            fill
            className="object-cover"
            alt="Looking picture 3"
          />
        </div>
      </div>
    </div>
  )
}
