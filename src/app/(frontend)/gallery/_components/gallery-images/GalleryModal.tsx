'use client'

import { useCallback, useEffect } from 'react'

type GalleryModalProps = {
  images: { src: string; alt: string }[]
  selectedIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function GalleryModal({
  images,
  selectedIndex,
  onClose,
  onNavigate,
}: GalleryModalProps) {
  const hasPrev = selectedIndex > 0
  const hasNext = selectedIndex < images.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(selectedIndex - 1)
  }, [hasPrev, selectedIndex, onNavigate])

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(selectedIndex + 1)
  }, [hasNext, selectedIndex, onNavigate])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onNavigate(selectedIndex - 1)
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNavigate(selectedIndex + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasPrev, hasNext, selectedIndex, onClose, onNavigate])

  const image = images[selectedIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-full max-w-4xl items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {hasPrev && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={goPrev}
            className="absolute left-2 z-10 -translate-x-full rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:left-0"
          >
            &#8592;
          </button>
        )}

        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[85vh] max-w-full rounded object-contain"
        />

        {hasNext && (
          <button
            type="button"
            aria-label="Next image"
            onClick={goNext}
            className="absolute right-2 z-10 translate-x-full rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:right-0"
          >
            &#8594;
          </button>
        )}

        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:opacity-70"
        >
          &#10005;
        </button>
      </div>
    </div>
  )
}
