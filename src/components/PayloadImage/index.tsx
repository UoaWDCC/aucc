'use client'

import Image, { StaticImageData } from 'next/image'

import PLACEHOLDER from '@/assets/hero.webp'
import { cn } from '@/lib/utils/cn'
import { Media } from '@/payload-types'

interface PayloadImageProps {
  media: Media | undefined
  placeholder?: StaticImageData | string
  className?: string
}

export function PayloadImage({
  media,
  className,
  placeholder,
}: PayloadImageProps) {
  if (!media)
    return (
      <Image
        src={placeholder ?? PLACEHOLDER}
        alt={'Placeholder image'}
        fill
        className={cn('object-cover', className)}
      />
    )

  const validSizes: { width: number; url: string }[] = [
    media.sizes?.doubleExtraLarge,
    media.sizes?.extraLarge,
    media.sizes?.large,
    media.sizes?.medium,
    media.sizes?.small,
  ].filter((size) => size?.width && size?.url) as {
    width: number
    url: string
  }[]

  const loader = ({
    src,
    width,
  }: {
    src: string
    width: number
    quality?: number
  }): string => {
    return (
      validSizes.find((size) => size.width >= width)?.url ||
      validSizes[0]?.url ||
      src
    )
  }

  return (
    <Image
      loader={loader}
      fill
      src={media.url ?? ''}
      alt={media.alt ?? ''}
      className={cn('object-cover', className)}
    />
  )
}
