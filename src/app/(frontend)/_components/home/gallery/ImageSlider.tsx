'use client'

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

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
            perView: 2.9,
            spacing: 24,
            origin: 'center',
          },
        },
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
        slider.on('detailsChanged', (s) => {
          s.track.details.slides.forEach((slide, index) => {
            const individualSlide = s.slides[index]
            individualSlide.style.opacity = slide.portion > 0.99 ? '1' : '0.5'
          })
        })
      },
    ],
  )

  return (
    <div>
      <div ref={sliderRef} className="keen-slider">
        {gallery.map((item) => {
          const media = item.image
          const src = media?.url || ''

          return (
            <div
              key={item.id}
              className="keen-slider__slide transition-opacity duration-500"
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
