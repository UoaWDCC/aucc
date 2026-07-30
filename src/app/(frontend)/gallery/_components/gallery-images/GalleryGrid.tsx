'use client'

import { useState } from 'react'

import { GalleryImage } from './GalleryImage'
import { GalleryModal } from './GalleryModal'

type GalleryGridProps = {
  images: { src: string; alt: string }[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <>
      <div
        className="grid grid-cols-2 justify-items-center md:grid-cols-3 lg:grid-cols-4"
        style={{ gap: 'clamp(0.5rem, 1.5vw, 1.5rem)' }}
      >
        {images.map((image, index) => (
          <GalleryImage
            key={index}
            src={image.src}
            alt={image.alt}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <GalleryModal
          images={images}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  )
}
