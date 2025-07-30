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

/**
 * Custom image component for Payload CMS that implements a custom loader.
 */
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
    media.sizes?.small,
    media.sizes?.medium,
    media.sizes?.large,
    media.sizes?.extraLarge,
    media.sizes?.doubleExtraLarge,
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
  }): string =>
    // Find the first size that is greater than or equal to the requested width
    validSizes.find((size) => size.width >= width)?.url ||
    // If no size is found, use the largest size
    validSizes.at(-1)?.url ||
    src

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
