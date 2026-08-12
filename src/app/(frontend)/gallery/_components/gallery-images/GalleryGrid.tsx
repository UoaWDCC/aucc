'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { GalleryImage, NoImages } from './GalleryImage'
import { GalleryModal } from './GalleryModal'

type Image = { src: string; alt: string }

type GalleryGridProps = {
  initialImages: Image[]
  initialHasMore: boolean
  availableTags: string[]
}

type PayloadGalleryDoc = {
  image: { url?: string; alt?: string } | number | null
}

type GalleryApiResponse = {
  images: PayloadGalleryDoc[]
  hasMore: boolean
}

const LIMIT = 12

function galleryUrl(page: number, tag: string | null) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(LIMIT),
  })
  if (tag) params.set('tag', tag)
  return `/api/gallery?${params}`
}

function toImages(docs: PayloadGalleryDoc[] = []): Image[] {
  return docs
    .filter(
      (
        doc,
      ): doc is PayloadGalleryDoc & {
        image: { url?: string; alt?: string }
      } => doc.image !== null && typeof doc.image === 'object',
    )
    .map((doc) => ({
      src: doc.image.url ?? '',
      alt: doc.image.alt ?? '',
    }))
}

export function GalleryGrid({
  initialImages,
  initialHasMore,
  availableTags,
}: GalleryGridProps) {
  const [images, setImages] = useState<Image[]>(initialImages)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const isFetchingRef = useRef(false)
  const hasMoreRef = useRef(initialHasMore)
  const pageRef = useRef(1)

  const requestIdRef = useRef(0)
  const didMountRef = useRef(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  function handleSelectFilter(tag: string | null) {
    setActiveFilter(tag)
    setIsPanelOpen(false)
  }

  const fetchNextPage = useCallback(async () => {
    if (isFetchingRef.current || !hasMoreRef.current) return
    isFetchingRef.current = true

    const requestId = requestIdRef.current
    const nextPage = pageRef.current + 1
    try {
      const res = await fetch(galleryUrl(nextPage, activeFilter))
      const data: GalleryApiResponse = await res.json()

      if (requestId !== requestIdRef.current) return

      setImages((prev) => [...prev, ...toImages(data.images)])
      pageRef.current = nextPage
      hasMoreRef.current = Boolean(data.hasMore)
    } finally {
      if (requestId === requestIdRef.current) {
        isFetchingRef.current = false
      }
    }
  }, [activeFilter])

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    const requestId = ++requestIdRef.current
    setImages([])
    setSelectedIndex(null)
    setIsLoading(true)
    pageRef.current = 1
    hasMoreRef.current = false
    isFetchingRef.current = true

    void (async () => {
      try {
        const res = await fetch(galleryUrl(1, activeFilter))
        const data: GalleryApiResponse = await res.json()

        if (requestId !== requestIdRef.current) return

        setImages(toImages(data.images))
        hasMoreRef.current = Boolean(data.hasMore)
      } finally {
        if (requestId === requestIdRef.current) {
          isFetchingRef.current = false
          setIsLoading(false)
        }
      }
    })()
  }, [activeFilter])

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
    <div className="relative">
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setIsPanelOpen((open) => !open)}
          aria-label="Filter gallery images"
          aria-expanded={isPanelOpen}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <FilterIcon />
        </button>
      </div>

      {isPanelOpen && (
        <div className="absolute top-12 right-0 z-10 flex min-w-[160px] flex-col gap-1 rounded-lg border bg-white p-3 shadow-lg">
          <button
            type="button"
            onClick={() => handleSelectFilter(null)}
            className={`rounded px-3 py-1.5 text-left ${
              activeFilter === null
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-50'
            }`}
          >
            All
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleSelectFilter(tag)}
              className={`rounded px-3 py-1.5 text-left ${
                activeFilter === tag
                  ? 'bg-gray-100 font-medium'
                  : 'hover:bg-gray-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {images.length === 0 && !isLoading ? (
        <NoImages />
      ) : (
        <div
          data-testid="gallery-grid"
          className="grid justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={{ gap: 'clamp(0.5rem, 1.5vw, 1.5rem)' }}
        >
          {images.map((image, index) => (
            <GalleryImage
              key={`${image.src}-${index}`}
              src={image.src}
              alt={image.alt}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      )}

      <div ref={sentinelRef} aria-hidden className="h-px w-full" />

      {selectedIndex !== null && (
        <GalleryModal
          images={images}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </div>
  )
}

function FilterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}
