'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { GalleryImage, NoImages } from './GalleryImage'
import { GalleryModal } from './GalleryModal'

type Image = { src: string; alt: string; tags?: string[] }

type GalleryGridProps = {
  initialImages: Image[]
  initialHasMore: boolean
}

type PayloadGalleryDoc = {
  image: { url?: string; alt?: string } | number | null
}

type GalleryApiResponse = {
  images: PayloadGalleryDoc[]
  hasMore: boolean
}

const LIMIT = 12

export function GalleryGrid({
  initialImages,
  initialHasMore,
}: GalleryGridProps) {
  const [images, setImages] = useState<Image[]>(initialImages)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const isFetchingRef = useRef(false)
  const hasMoreRef = useRef(initialHasMore)
  const pageRef = useRef(1)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    images.forEach((image) => image.tags?.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [images])

  const filteredImages = useMemo(() => {
    if (!activeFilter) return images
    return images.filter((image) => image.tags?.includes(activeFilter))
  }, [images, activeFilter])

  function handleSelectFilter(tag: string | null) {
    setActiveFilter(tag)
    setIsPanelOpen(false)
  }

  const fetchNextPage = useCallback(async () => {
    // Scroll-loading is paused while a filter is active — newly fetched
    // pages don't carry tags yet, so they'd silently bypass the filter.
    // TODO: move filtering server-side (via /api/gallery?tag=) once real
    // tags are wired up, so infinite scroll works while filtered.
    if (isFetchingRef.current || !hasMoreRef.current || activeFilter) return
    isFetchingRef.current = true

    const nextPage = pageRef.current + 1
    try {
      const res = await fetch(`/api/gallery?page=${nextPage}&limit=${LIMIT}`)
      const data: GalleryApiResponse = await res.json()

      const newImages: Image[] = (data.images ?? [])
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

      setImages((prev) => [...prev, ...newImages])
      pageRef.current = nextPage
      hasMoreRef.current = Boolean(data.hasMore)
    } finally {
      isFetchingRef.current = false
    }
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

  if (images.length === 0) {
    return <NoImages />
  }

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

      {filteredImages.length === 0 ? (
        <NoImages />
      ) : (
        <div
          data-testid="gallery-grid"
          className="grid justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={{ gap: 'clamp(0.5rem, 1.5vw, 1.5rem)' }}
        >
          {filteredImages.map((image, index) => (
            <GalleryImage
              key={index}
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
          images={filteredImages}
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
