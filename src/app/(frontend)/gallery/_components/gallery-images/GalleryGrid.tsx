'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { GalleryImage } from './GalleryImage'

type Image = { src: string; alt: string }

type GalleryGridProps = {
  initialImages: Image[]
  initialHasMore: boolean
}

const LIMIT = 12

export function GalleryGrid({
  initialImages,
  initialHasMore,
}: GalleryGridProps) {
  const [images, setImages] = useState<Image[]>(initialImages)

  const isFetchingRef = useRef(false)
  const hasMoreRef = useRef(initialHasMore)
  const pageRef = useRef(1)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const fetchNextPage = useCallback(async () => {
    if (isFetchingRef.current || !hasMoreRef.current) return
    isFetchingRef.current = true

    const nextPage = pageRef.current + 1
    try {
      const res = await fetch(`/api/gallery?page=${nextPage}&limit=${LIMIT}`)
      const data = await res.json()

      const newImages: Image[] = (data.docs ?? [])
        .filter((doc: any) => doc.image && typeof doc.image === 'object')
        .map((doc: any) => ({
          src: doc.image.url ?? '',
          alt: doc.image.alt ?? '',
        }))

      setImages((prev) => [...prev, ...newImages])
      pageRef.current = nextPage
      hasMoreRef.current = Boolean(data.hasNextPage)
    } finally {
      isFetchingRef.current = false
    }
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage()
      }
    })

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [fetchNextPage])

  return (
    <>
      <div
        className="grid grid-cols-2 justify-items-center md:grid-cols-3 lg:grid-cols-4"
        style={{ gap: 'clamp(0.5rem, 1.5vw, 1.5rem)' }}
      >
        {images.map((image, index) => (
          <GalleryImage key={index} src={image.src} alt={image.alt} />
        ))}
      </div>

      <div ref={sentinelRef} aria-hidden className="h-px w-full" />
    </>
  )
}
