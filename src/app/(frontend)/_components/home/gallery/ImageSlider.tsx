'use client'

import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

import type { GalleryDTO } from '@/queries/gallery'

type Props = {
  gallery: GalleryDTO[]
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
        {gallery.map((item, i) => {
          const media = item.image
          const src = media?.url || ''

          return (
            <div key={item.id} className="keen-slider__slide">
              {src ? (
                <img
                  src={src}
                  alt={media?.alt || ''}
                  className="aspect-[4/3] w-full object-cover"
                />
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
