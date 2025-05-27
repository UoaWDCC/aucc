import { env } from '@/lib/env'

export function WelcomeImages() {
  const imageURLs = [
    `${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-01.v1.webp`,
    `${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-02.v1.webp`,
    `${env.NEXT_PUBLIC_CF_URL}/static/homepage/welcome-03.v1.webp`,
  ]

  return (
    <>
      <img
        className="absolute top-140 -left-4 h-43.5 w-54 rounded-2xl md:top-29 md:h-73.5 md:w-92"
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
    </>
  )
}
