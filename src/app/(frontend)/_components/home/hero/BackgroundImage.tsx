import Image from 'next/image'

interface BackgroundImageProps {
  src: string
  alt: string
}

export function BackgroundImage({ src, alt }: BackgroundImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="absolute inset-0 z-0 h-full w-full object-cover"
    />
  )
}
