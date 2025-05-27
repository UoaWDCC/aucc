import Image from 'next/image'

interface BackgroundImageProps {
  src: string
  alt: string
}

export function BackgroundImage({ src, alt }: BackgroundImageProps) {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="absolute inset-0 z-0 h-full w-full object-cover brightness-90"
      />
      <div className="absolute inset-0 z-1 h-full w-full bg-gradient-to-t from-black/40 to-white/20"></div>
    </div>
  )
}
