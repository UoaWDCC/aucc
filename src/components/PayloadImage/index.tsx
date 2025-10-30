'use client'

import Image, { StaticImageData } from 'next/image'

import PLACEHOLDER from '@/assets/hero.webp'
import { cn } from '@/lib/utils/cn'
import { Media } from '@/payload-types'

interface ImageSize {
  width: number
  url: string
}

/**
 * Selects the optimal image URL based on requested width
 * @param validSizes Available image sizes sorted by width
 * @param requestedWidth The width requested by the image loader
 * @param fallbackSrc Fallback URL if no sizes are available
 * @returns The optimal image URL
 */
export function selectOptimalImageSize(
  validSizes: ImageSize[],
  requestedWidth: number,
  fallbackSrc: string,
): string {
  // Find the first size that is greater than or equal to the requested width
  const selectedSize = validSizes
    .sort((a, b) => a.width - b.width)
    .find((size) => size.width >= requestedWidth)

  if (selectedSize) return selectedSize.url

  // If no size is found, use the largest size
  const largestSize = validSizes.at(-1)
  if (largestSize) return largestSize.url

  // Fallback to original src
  return fallbackSrc
}

interface PayloadImageProps {
  media:
    | Media
    | { url: string; alt?: string; width?: number; height?: number }
    | undefined
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

  // Handle simple image objects (no sizes) - use Next.js Image directly
  if (!('sizes' in media) || !media.sizes) {
    return (
      <Image
        src={media.url || placeholder || PLACEHOLDER}
        alt={media.alt || ''}
        fill
        className={cn('object-cover', className)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    )
  }

  // Handle full Media objects with Payload optimization
  const validSizes: ImageSize[] = [
    media.sizes?.small,
    media.sizes?.medium,
    media.sizes?.large,
    media.sizes?.extraLarge,
    media.sizes?.doubleExtraLarge,
  ].filter((size) => size?.width && size?.url) as ImageSize[]

  const loader = ({
    src,
    width,
  }: {
    src: string
    width: number
    quality?: number
  }): string => selectOptimalImageSize(validSizes, width, src)

  return (
    <Image
      loader={loader}
      fill
      src={media.url ?? PLACEHOLDER}
      alt={media.alt ?? ''}
      className={cn('object-cover', className)}
    />
  )
}
