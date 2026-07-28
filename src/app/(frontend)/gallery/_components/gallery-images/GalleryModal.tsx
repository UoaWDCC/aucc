'use client'

import { useCallback, useEffect } from 'react'
import Image from 'next/image'

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div className="flex w-full max-w-5xl items-center gap-4 md:gap-8">
        <div className="w-12 flex-shrink-0 md:w-16">
          {hasPrev && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            >
              &#8592;
            </button>
          )}
        </div>

        <div className="relative min-w-0 flex-1" style={{ height: '65vh' }}>
          <button
            type="button"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="absolute -top-10 right-0 z-10 text-white hover:opacity-70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            onClick={(e) => e.stopPropagation()}
            className="rounded object-contain"
          />
        </div>

        <div className="w-12 flex-shrink-0 md:w-16">
          {hasNext && (
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            >
              &#8594;
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
