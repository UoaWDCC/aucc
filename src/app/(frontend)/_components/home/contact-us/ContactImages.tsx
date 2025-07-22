import Image from 'next/image'

import { env } from '@/lib/env'

export function ContactImages() {
  return (
    <div className="relative mx-auto mt-31 mb-36 w-full max-w-140">
      {/* 전체 이미지 그룹 */}
      <div className="relative mt-20 h-auto w-full">
        {/* 이미지 2 + 3 그룹 */}
        <div className="relative mb-16 h-[min(500px,60vw)] w-full">
          {/* 이미지 2 - 오른쪽 상단 */}
          <div className="absolute top-0 right-0 aspect-[11/16] w-[38%] max-w-[230px] overflow-hidden rounded-2xl">
            <Image
              src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-02.v1.webp`}
              alt="Looking picture 2"
              fill
              className="object-cover"
            />
          </div>

          {/* 이미지 3 - 겹쳐서 가운데 */}
          <div className="absolute top-[55%] left-[60%] aspect-[2/3] w-[24%] max-w-[140px] -translate-x-1/2 overflow-hidden rounded-2xl md:top-[45%] md:left-[62%] xl:top-[35%] xl:left-[64%]">
            <Image
              src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-03.v1.webp`}
              alt="Looking picture 3"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 이미지 1 - 하단 오른쪽에 고정 배치 */}
        <div className="relative mt-[6%] flex justify-end pr-[3%] md:mt-[4%] xl:mt-[2%]">
          <div className="w-[30%] max-w-[160px] rounded-2xl">
            <Image
              src={`${env.NEXT_PUBLIC_CF_URL}/static/homepage/looking-for-us-01.v1.webp`}
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
