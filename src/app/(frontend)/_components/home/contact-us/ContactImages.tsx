import Image from 'next/image'

import { env } from '@/lib/env'

export function ContactImages() {
  return (
    <div className="relative mx-auto mt-31 h-auto min-h-[1000px] max-w-140 md:max-w-170 xl:max-w-170">
      {/* Image 1 */}
      <div className="absolute right-0 bottom-[39%] aspect-[4/3] w-[28%] max-w-[140px] overflow-hidden rounded-2xl md:right-[-2%] md:bottom-[42%] md:max-w-[170px] xl:right-[-2%] xl:bottom-[42%] xl:max-w-[170px]">
        <Image
          src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-01.v1.webp`}
          alt="Looking picture 1"
          fill
          className="object-cover"
        />
      </div>

      {/* Image 2 */}
      <div className="absolute top-20 right-0 aspect-[11/16] w-[38%] max-w-[200px] overflow-hidden rounded-2xl md:top-0 md:right-[-2%] md:max-w-[230px] xl:top-0 xl:right-[-2%] xl:max-w-[230px]">
        <Image
          src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-02.v1.webp`}
          alt="Looking picture 2"
          fill
          className="object-cover"
        />
      </div>
      {/* Image 3 */}
      <div className="absolute top-[25%] left-1/2 aspect-[2/3] w-[24%] max-w-[120px] overflow-hidden rounded-2xl md:top-[22%] md:left-[50%] md:max-w-[140px] xl:left-[50%] xl:max-w-[140px]">
        <Image
          src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-03.v1.webp`}
          alt="Looking picture 3"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
