'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'

import lookingForUs01 from '@/assets/looking-for-us-01.webp'
import lookingForUs02 from '@/assets/looking-for-us-02.webp'
import lookingForUs03 from '@/assets/looking-for-us-03.webp'

export function ContactImages() {
  const [isMedium, setIsMedium] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsMedium(window.innerWidth < 1024)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])
  return (
    <div className="relative mt-18 mb-36 w-full md:mt-16 md:mb-28 lg:mt-[-20px] lg:mr-[2%] lg:mb-16 lg:ml-auto lg:w-[420px] xl:mt-[-20px] xl:mr-[2%] xl:w-[500px]">
      <div className="relative mt-20 h-auto w-full md:mt-12 lg:mt-0">
        <ParallaxProvider>
          <Parallax
            translateY={isMedium ? ['0px', '-115px'] : ['0px', '-200px']}
          >
            <div className="relative mb-16 h-[min(500px,60vw)] w-full md:mb-12 lg:mb-10 xl:mb-10">
              <div className="relative mr-[1%] ml-auto w-fit">
                {/* image 2 */}
                <div className="relative aspect-[11/16] w-[38vw] max-w-[230px] overflow-hidden rounded-2xl xl:w-[30vw] xl:max-w-[260px]">
                  <Image
                    src={lookingForUs02}
                    alt="Looking picture 2"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* image 3 */}
                <div className="absolute top-[55%] right-[80%] z-10 aspect-[2/3] w-[24vw] max-w-[140px] overflow-hidden rounded-2xl xl:w-[20vw] xl:max-w-[160px]">
                  <Image
                    src={lookingForUs03}
                    alt="Looking picture 3"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            {/* image 1 */}
            <div className="relative mt-[6%] flex justify-end pr-[3%] md:mt-[4%] lg:mt-[1%]">
              <div className="w-[30%] max-w-[160px] rounded-2xl xl:w-[36%] xl:max-w-[180px]">
                <Image
                  src={lookingForUs01}
                  alt="Looking picture 1"
                  width={180}
                  height={135}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </Parallax>
        </ParallaxProvider>
      </div>
    </div>
  )
}
