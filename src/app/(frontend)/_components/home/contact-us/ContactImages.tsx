import Image from 'next/image'

import lookingForUs01 from '@/assets/looking-for-us-01.webp'
import lookingForUs02 from '@/assets/looking-for-us-02.webp'
import lookingForUs03 from '@/assets/looking-for-us-03.webp'

export function ContactImages() {
  return (
    <>
      {/* Image 1 */}
      <div className="absolute right-2 bottom-40 z-1 aspect-[2/3] w-40 overflow-hidden rounded-2xl md:right-4 md:bottom-55 md:w-44 lg:right-8 lg:bottom-70 lg:w-60">
        <Image
          src={lookingForUs01}
          alt="Looking picture 1"
          fill
          className="object-cover"
        />
      </div>

      {/* Image 2 */}
      <div className="absolute right-26 bottom-28 z-2 aspect-[2/3] w-24 overflow-hidden rounded-2xl md:right-34 md:bottom-40 md:w-30 lg:right-55 lg:bottom-50 lg:w-36">
        <Image
          src={lookingForUs02}
          alt="Looking picture 2"
          fill
          className="object-cover"
        />
      </div>
      {/* Image 3 */}
      <div className="absolute right-2 bottom-10 z-3 aspect-[4/3] w-20 overflow-hidden rounded-2xl md:right-4 md:w-30 lg:right-8 lg:w-40">
        <Image
          src={lookingForUs03}
          alt="Looking picture 3"
          fill
          className="object-cover"
        />
      </div>
    </>
  )
}
