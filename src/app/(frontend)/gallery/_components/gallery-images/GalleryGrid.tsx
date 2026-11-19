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
  return `/api/gallery-images?${params}`
}

async function loadPage(
  page: number,
  tag: string | null,
): Promise<GalleryApiResponse> {
  const res = await fetch(galleryUrl(page, tag))
  if (!res.ok) throw new Error(`Gallery request failed (${res.status})`)
  return res.json()
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
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(initialHasMore)
  // 'filter': the first page for a filter failed. 'more': a later page failed.
  const [loadError, setLoadError] = useState<'filter' | 'more' | null>(null)
  const [reloadCount, setReloadCount] = useState(0)

  const isFetchingRef = useRef(false)
  const hasMoreRef = useRef(initialHasMore)
  // Stops the scroll observer from retrying a failed page in a loop; the
  // "Try again" button clears it.
  const loadErrorRef = useRef(false)
  const pageRef = useRef(1)

  const requestIdRef = useRef(0)
  const didMountRef = useRef(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const isInitialCallbackRef = useRef(true)

  function handleSelectFilter(tag: string | null) {
    setActiveFilter(tag)
    setIsPanelOpen(false)
  }

  function setMore(value: boolean) {
    hasMoreRef.current = value
    setHasMore(value)
  }

  function setError(value: 'filter' | 'more' | null) {
    loadErrorRef.current = value !== null
    setLoadError(value)
  }

  const fetchNextPage = useCallback(async () => {
    if (isFetchingRef.current || !hasMoreRef.current || loadErrorRef.current) {
      return
    }
    isFetchingRef.current = true
    setIsLoadingMore(true)

    const requestId = requestIdRef.current
    const nextPage = pageRef.current + 1
    try {
      const data = await loadPage(nextPage, activeFilter)

      if (requestId !== requestIdRef.current) return

      setImages((prev) => [...prev, ...toImages(data.images)])
      pageRef.current = nextPage
      setMore(Boolean(data.hasMore))
    } catch (error) {
      if (requestId !== requestIdRef.current) return
      console.error(error)
      setError('more')
    } finally {
      if (requestId === requestIdRef.current) {
        isFetchingRef.current = false
        setIsLoadingMore(false)
      }
    }
  }, [activeFilter])

  function retry() {
    const failed = loadError
    setError(null)
    if (failed === 'filter') {
      setReloadCount((count) => count + 1)
    } else {
      void fetchNextPage()
    }
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    const requestId = ++requestIdRef.current
    setImages([])
    setSelectedIndex(null)
    setIsLoading(true)
    setIsLoadingMore(false)
    setError(null)
    pageRef.current = 1
    setMore(false)
    isFetchingRef.current = true

    void (async () => {
      try {
        const data = await loadPage(1, activeFilter)

        if (requestId !== requestIdRef.current) return

        setImages(toImages(data.images))
        setMore(Boolean(data.hasMore))
      } catch (error) {
        if (requestId !== requestIdRef.current) return
        console.error(error)
        setError('filter')
      } finally {
        if (requestId === requestIdRef.current) {
          isFetchingRef.current = false
          setIsLoading(false)
        }
      }
    })()
  }, [activeFilter, reloadCount])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    isInitialCallbackRef.current = true
    const observer = new IntersectionObserver((entries) => {
      if (isInitialCallbackRef.current) {
        isInitialCallbackRef.current = false
        return
      }
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

      {images.length === 0 && !isLoading && loadError === null ? (
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

      <div aria-live="polite" className="text-cream flex justify-center py-8">
        {(isLoading || isLoadingMore) && <LoadingSpinner />}
        {loadError !== null && (
          <div
            data-testid="gallery-load-error"
            className="flex flex-col items-center gap-3 text-center"
          >
            <p>Sorry, we couldn&apos;t load the photos.</p>
            <button
              type="button"
              onClick={retry}
              className="border-cream hover:bg-cream/10 cursor-pointer rounded-full border-2 px-5 py-2"
            >
              Try again
            </button>
          </div>
        )}
        {!isLoading &&
          !isLoadingMore &&
          loadError === null &&
          !hasMore &&
          images.length > 0 && (
            <p data-testid="gallery-end" className="text-cream/70">
              You&apos;ve reached the end of the gallery.
            </p>
          )}
      </div>

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

function LoadingSpinner() {
  return (
    <div role="status" className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="border-cream/30 border-t-cream h-6 w-6 animate-spin rounded-full border-2"
      />
      <span>Loading photos…</span>
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
