'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils/cn'

export const NO_IMAGES_EMPTY_STATE_COPY =
  'There are no images available at this moment.'

type GalleryImageProps = {
  src: string
  alt: string
  onClick?: () => void
}

export function GalleryImage({ src, alt, onClick }: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className="relative aspect-square w-full cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {!isLoaded && !hasError ? (
        <Skeleton
          data-testid="gallery-image-skeleton"
          className="absolute inset-0 h-full w-full rounded-none"
        />
      ) : null}
      {hasError ? (
        <div
          role="alert"
          className="bg-skeleton flex h-full w-full items-center justify-center text-center text-sm text-white"
        >
          Image unavailable
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={cn(
            'object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}

export function NoImages() {
  return (
    <div
      data-testid="gallery-empty-state"
      className="flex h-full w-full items-center justify-center text-white"
    >
      {NO_IMAGES_EMPTY_STATE_COPY}
    </div>
  )
}
