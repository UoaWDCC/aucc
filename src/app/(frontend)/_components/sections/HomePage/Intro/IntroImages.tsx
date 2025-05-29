import { env } from '@/lib/env'

export function IntroImages() {
  const imageURLs = [
    `${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-01.v1.webp`,
    `${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-02.v1.webp`,
    `${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-03.v1.webp`,
  ]
  const paddleURL = `${env.NEXT_PUBLIC_CF_URL}/static/homepage/paddle.v1.webp`

  return (
    <>
      <img
        className="absolute top-140 -left-4 h-43.5 w-54 max-w-92 rounded-2xl object-cover"
        // md:top-29 md:aspect-auto md:h-74 md:w-92   -Scrapped breakpoint code, consider breakpoint after design done
        src={imageURLs && imageURLs[0]}
      ></img>
      <img
        className="absolute top-187 right-30 z-2 h-25 w-20.5 rounded-2xl"
        src={imageURLs && imageURLs[1]}
      ></img>
      <img
        className="absolute top-160 right-4 z-1 h-43 w-28 rounded-2xl"
        src={imageURLs && imageURLs[2]}
      ></img>

      <img
        src={paddleURL}
        className="absolute top-22 -left-9 w-[65%] min-w-75 rotate-7"
        //  md:top-85 md:-right-[75*4px] md:left-auto md:w-170 md:rotate-90   -Scrapped breakpoint code, consider breakpoint after design done
      ></img>
    </>
  )
}
