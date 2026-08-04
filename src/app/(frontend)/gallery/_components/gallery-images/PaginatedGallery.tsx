'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  fetchGalleryPage,
  type GalleryImage,
} from '@/lib/utils/fetch-gallery-page'
import { FilterButton } from './FilterButton'
import { GalleryGrid } from './GalleryGrid'

type PaginatedGalleryProps = {
  tags: string[]
}

export function PaginatedGallery({ tags }: PaginatedGalleryProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const controllerRef = useRef<AbortController | null>(null)

  const fetchPage = useCallback(
    async (pageToLoad: number, tag: string | null) => {
      controllerRef.current?.abort()
      const controller = new AbortController()
      controllerRef.current = controller

      setLoading(true)
      setError(false)
      try {
        const { images: mapped, hasMore } = await fetchGalleryPage(
          pageToLoad,
          tag,
          controller.signal,
        )
        setImages((prev) => (pageToLoad === 1 ? mapped : [...prev, ...mapped]))
        setHasMore(hasMore)
        setPage(pageToLoad)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setError(true)
        setHasMore(false)
      } finally {
        if (controllerRef.current === controller) setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    setImages([])
    setHasMore(false)
    fetchPage(1, activeTag)
  }, [activeTag, fetchPage])

  const loadMore = () => {
    if (!loading && hasMore) fetchPage(page + 1, activeTag)
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterButton
          label="All"
          active={activeTag === null}
          onClick={() => setActiveTag(null)}
        />
        {tags.map((tag) => (
          <FilterButton
            key={tag}
            label={tag}
            active={activeTag === tag}
            onClick={() => setActiveTag(tag)}
          />
        ))}
      </div>

      {error ? (
        <p className="font-body text-center text-white">
          Couldn’t load the gallery.{' '}
          <button onClick={() => fetchPage(1, activeTag)} className="underline">
            Try again
          </button>
        </p>
      ) : loading && images.length === 0 ? (
        <p className="font-body text-center text-white">Loading…</p>
      ) : (
        <GalleryGrid images={images} />
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="font-body rounded-full bg-white/90 px-6 py-2 text-[#89ACAD] disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  )
}
