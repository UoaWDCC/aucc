'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'

import { env } from '@/lib/env'

const PADDLE_URL = `${env.NEXT_PUBLIC_CF_URL}/static/homepage/paddle.v1.webp`
const WELCOME_01_URL = `${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-01.v1.webp`
const WELCOME_02_URL = `${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-02.v1.webp`
const WELCOME_03_URL = `${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-03.v1.webp`

export function IntroImages() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsTablet(window.innerWidth < 768)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  return (
    <ParallaxProvider>
      <div className="relative mt-31 mr-auto ml-auto h-auto max-w-140 md:-mt-44 md:ml-0 xl:-mt-71">
        <Parallax translateY={isTablet ? ['0px', '-120px'] : ['15px', '-90px']}>
          <div className="absolute -left-4 aspect-[54/44] w-[58%] overflow-hidden rounded-2xl md:-left-11 md:h-44 md:w-55 xl:h-74 xl:w-92">
            <Image
              src={WELCOME_01_URL}
              fill
              className="object-cover"
              alt="Intro picture 1"
            />
          </div>
        </Parallax>

        <Parallax
          translateY={isTablet ? ['-40px', '-160px'] : ['25px', '-180px']}
        >
          <div className="absolute right-4 z-1 mt-[21%] aspect-[28/43] w-[30%] overflow-hidden rounded-2xl md:left-26 md:mt-47 md:h-37 md:w-24 xl:left-51 xl:mt-79 xl:h-62 xl:w-40">
            <Image
              src={WELCOME_03_URL}
              fill
              className="object-cover"
              alt="Intro picture 3"
            />
          </div>
        </Parallax>
      </div>

      <Parallax translateY={isTablet ? ['80px', '-160px'] : ['35px', '-310px']}>
        <div className="absolute right-[32%] z-2 mt-[50%] aspect-[20/25] w-[22%] overflow-hidden rounded-2xl md:left-46 md:mt-38 md:h-22 md:w-18 xl:left-85 xl:mt-64 xl:h-37 xl:w-30">
          <Image
            src={WELCOME_02_URL}
            fill
            className="object-cover"
            alt="Intro picture 2"
          />
        </div>
      </Parallax>
      {isTablet ? (
        <div className="xl: absolute top-25 -left-9 h-[calc(0.21*65vw)] w-[65%] min-w-75 origin-top-right rotate-7 overflow-hidden md:-top-2 md:right-10 md:left-auto md:mr-[7%] md:h-20 md:w-115 md:origin-top-right md:-rotate-90 xl:mt-4 xl:w-182">
          <Image
            src={PADDLE_URL}
            fill
            className="-scale-y-100 object-cover"
            alt="Paddle"
          />
        </div>
      ) : (
        <Parallax translateY={['0px', '-150px']} rotate={[0, 5]}>
          <div className="xl: absolute top-25 -left-9 h-[calc(0.21*65vw)] w-[65%] min-w-75 origin-top-right rotate-7 overflow-hidden md:-top-2 md:right-10 md:left-auto md:mr-[7%] md:h-20 md:w-115 md:origin-top-right md:-rotate-90 xl:mt-4 xl:w-182">
            <Image
              src={PADDLE_URL}
              fill
              className="-scale-y-100 object-cover"
              alt="Paddle"
            />
          </div>
        </Parallax>
      )}
    </ParallaxProvider>
  )
}
