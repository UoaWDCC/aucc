import Image from 'next/image'

import lookingForUs01 from '@/assets/looking-for-us-01.webp'
import lookingForUs02 from '@/assets/looking-for-us-02.webp'
import lookingForUs03 from '@/assets/looking-for-us-03.webp'

export function ContactImages() {
  return (
    <div className="relative mx-auto mt-31 mb-36 w-full max-w-140">
      {/* Whole image container */}
      <div className="relative mt-20 h-auto w-full">
        {/* image 2 and 3 */}
        <div className="relative mb-16 h-[min(500px,60vw)] w-full">
          {/* image 2: right top */}
          <div className="absolute top-0 right-0 aspect-[11/16] w-[38%] max-w-[230px] overflow-hidden rounded-2xl">
            <Image
              src={lookingForUs02}
              alt="Looking picture 2"
              fill
              className="object-cover"
            />
          </div>

          {/* image 3: middle */}
          <div className="absolute top-[55%] left-[60%] aspect-[2/3] w-[24%] max-w-[140px] -translate-x-1/2 overflow-hidden rounded-2xl md:top-[45%] md:left-[62%] xl:top-[35%] xl:left-[64%]">
            <Image
              src={lookingForUs03}
              alt="Looking picture 3"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* image 1: right bottom */}
        <div className="relative mt-[6%] flex justify-end pr-[3%] md:mt-[4%] xl:mt-[2%]">
          <div className="w-[30%] max-w-[160px] rounded-2xl">
            <Image
              src={lookingForUs01}
              alt="Looking picture 1"
              width={160}
              height={120}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
