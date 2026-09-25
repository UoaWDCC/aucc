'use client'

import { useEffect, useRef } from 'react'

import type { ApprovedSwimPhotoDTO } from '@/queries/swims'

type SwimsCarouselProps = {
  photos: ApprovedSwimPhotoDTO[]
}

const MIN_TILES = 3
const SCROLL_SPEED_PX_PER_FRAME = 0.5

function getImageUrl(image: ApprovedSwimPhotoDTO['image']): string {
  return typeof image === 'object' ? (image.url ?? '') : ''
}

function getImageAlt(image: ApprovedSwimPhotoDTO['image']): string {
  return typeof image === 'object' ? (image.alt ?? 'Swim photo') : 'Swim photo'
}

export function SwimsCarousel({ photos }: SwimsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)

  useEffect(() => {
    const el = scrollRef.current
    const track = trackRef.current
    if (!el || !track) return
    if (track.scrollWidth / 2 <= el.clientWidth) return // nothing to loop

    let frameId: number

    function step() {
      if (!el || !track) return
      const singleSetWidth = track.scrollWidth / 2

      if (!isPausedRef.current) {
        el.scrollLeft += SCROLL_SPEED_PX_PER_FRAME
        // Once we've scrolled past one full copy of the photos, jump back
        // by exactly that width — since the second copy is identical, this
        // jump is invisible and the loop feels continuous.
        if (el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth
        }
      }
      frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [photos.length])

  if (photos.length === 0) {
    return null
  }

  const placeholderCount = Math.max(0, MIN_TILES - photos.length)
  const paddedPhotos = [
    ...photos,
    ...Array.from({ length: placeholderCount }).map(() => null),
  ]
  // Duplicate the full row (photos + placeholders) so the loop has a
  // seamless second copy to scroll into.
  const loopedPhotos = [...paddedPhotos, ...paddedPhotos]

  return (
    <div
      ref={scrollRef}
      data-testid="swims-carousel"
      onMouseEnter={() => (isPausedRef.current = true)}
      onMouseLeave={() => (isPausedRef.current = false)}
      onTouchStart={() => (isPausedRef.current = true)}
      onTouchEnd={() => (isPausedRef.current = false)}
      className="-mx-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:-mx-12 [&::-webkit-scrollbar]:hidden"
    >
      <div ref={trackRef} className="flex gap-6 md:gap-8">
        {loopedPhotos.map((photo, index) =>
          photo === null ? (
            <div
              key={`placeholder-${index}`}
              data-testid="swims-carousel-placeholder"
              className="aspect-4/3 w-1/3 shrink-0 bg-[#D9D9D9]"
            />
          ) : (
            <div
              key={`${photo.id}-${index}`}
              className="aspect-4/3 w-1/3 shrink-0 overflow-hidden bg-[#D9D9D9]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getImageUrl(photo.image)}
                alt={getImageAlt(photo.image)}
                className="h-full w-full object-cover"
              />
            </div>
          ),
        )}
      </div>
    </div>
  )
}
