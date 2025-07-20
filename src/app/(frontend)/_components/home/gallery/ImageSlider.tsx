'use client'

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

import type { GalleryDTO } from '@/queries/gallery'

type Props = {
  gallery: GalleryDTO[]
}

const tailwindBreakpoints = {
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
}

export default function GallerySlider({ gallery }: Props) {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: 'snap',
      slides: {
        perView: 1.1,
        spacing: 12,
        origin: 'center',
      },
      breakpoints: {
        [tailwindBreakpoints.md]: {
          slides: {
            perView: 2.1,
            spacing: 48,
            origin: 'center',
          },
        },
      },
      detailsChanged: (slider) => {
        // Update opacity based on slide positions
        if (slider.track.details?.slides) {
          // Find the slide with the highest portion (most centered)
          let maxPortion = 0
          let centerSlideIdx = 0

          slider.track.details.slides.forEach((slide, idx) => {
            if (slide.portion > maxPortion) {
              maxPortion = slide.portion
              centerSlideIdx = idx
            }
          })

          // Apply opacity to all slides
          slider.track.details.slides.forEach((slide, idx) => {
            const slideElement = slideRefs.current[idx]
            if (slideElement) {
              // Center slide gets full opacity, others get reduced opacity
              const opacity = idx === centerSlideIdx ? 1 : 0.5
              slideElement.style.opacity = opacity.toString()
            }
          })
        }
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>

        const nextTimeout = () => {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            slider.next()
          }, 6000)
        }
        slider.on('created', nextTimeout)
        slider.on('dragStarted', () => clearTimeout(timeout))
        slider.on('animationEnded', nextTimeout)
      },
    ],
  )

  return (
    <div>
      <div ref={sliderRef} className="keen-slider">
        {gallery.map((item, index) => {
          const media = item.image
          const src = media?.url || ''

          return (
            <div
              key={item.id}
              className="keen-slider__slide transition-opacity duration-300 ease-out"
              ref={(slideRef) => {
                slideRefs.current[index] = slideRef
              }}
            >
              {src ? (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={src}
                    alt={media?.alt || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div>Image not available</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
