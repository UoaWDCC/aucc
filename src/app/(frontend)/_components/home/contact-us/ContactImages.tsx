import Image from 'next/image'

import lookingForUs01 from '@/assets/looking-for-us-01.webp'
import lookingForUs02 from '@/assets/looking-for-us-02.webp'
import lookingForUs03 from '@/assets/looking-for-us-03.webp'

export function ContactImages() {
  return (
    <div className="relative mx-auto mt-28 h-auto max-w-140">
      <div className="relative h-[850px] w-full">
        <div className="absolute right-[0%] bottom-[50%] z-10 aspect-[4/3] h-auto w-[25%] overflow-hidden rounded-2xl">
          <Image
            src={lookingForUs01}
            fill
            className="object-cover"
            alt="Looking picture 1"
          />
        </div>

        <div className="absolute top-[0%] right-[0%] z-10 aspect-[5/8] h-auto w-[42%] overflow-hidden rounded-[16px]">
          <Image
            src={lookingForUs02}
            fill
            className="object-cover"
            alt="Looking picture 2"
          />
        </div>

        <div className="absolute top-[22%] left-[46%] z-20 aspect-[2/3] h-auto w-[24%] overflow-hidden rounded-[16px]">
          <Image
            src={lookingForUs03}
            fill
            className="object-cover"
            alt="Looking picture 3"
          />
        </div>
      </div>
    </div>
  )
}
