'use client'

import { useMemo, useState } from 'react'

import { GalleryGrid } from './GalleryGrid'
import { NoImages } from './GalleryImage'

type GalleryImageItem = {
  src: string
  alt: string
  tags: string[]
}

type FilterableGalleryGridProps = {
  images: GalleryImageItem[]
  initialHasMore: boolean
}

export function FilterableGalleryGrid({
  images,
  initialHasMore,
}: FilterableGalleryGridProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    images.forEach((image) => image.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [images])

  const filteredImages = useMemo(() => {
    if (!activeFilter) return images
    return images.filter((image) => image.tags.includes(activeFilter))
  }, [images, activeFilter])

  function handleSelectFilter(tag: string | null) {
    setActiveFilter(tag)
    setIsPanelOpen(false)
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
        <GalleryGrid
          // NOTE: filtering is client-side over already-loaded images only.
          // Scroll-loading is disabled while a filter is active so newly
          // fetched (unfiltered) pages can't silently bypass the filter.
          // TODO: move filtering server-side (via /api/gallery?tag=) once
          // real tags are wired up, so infinite scroll works while filtered.
          key={activeFilter ?? 'all'}
          initialImages={filteredImages.map(({ src, alt }) => ({ src, alt }))}
          initialHasMore={activeFilter === null ? initialHasMore : false}
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
