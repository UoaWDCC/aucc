'use client'

import Image from 'next/image'

import { Media } from '@/payload-types'

export function PayloadImage({ media }: { media: Media }) {
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
      className="object-cover"
    />
  )
}
