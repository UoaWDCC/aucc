'use client'

import React from 'react'
import { KeenSliderPlugin, useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

import { PayloadImage } from '@/components/PayloadImage'
import type { GalleryDTO } from '@/queries/gallery'
import { NavArrow } from './NavArrow'

type Props = {
  gallery: GalleryDTO[]
}

const tailwindBreakpoints = {
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
}

const WindowScrollToDrag: KeenSliderPlugin = (slider) => {
  let lastScrollY = window.scrollY
  let dragX = 0
  let isDragging = false
  let timeout: ReturnType<typeof setTimeout>

  const onScroll = () => {
    const currentY = window.scrollY
    const deltaY = currentY - lastScrollY
    dragX -= deltaY
    lastScrollY = currentY

    if (!isDragging) {
      slider.container.dispatchEvent(
        new CustomEvent('ksDragStart', { detail: { x: dragX, y: 0 } }),
      )
      isDragging = true
    }

    slider.container.dispatchEvent(
      new CustomEvent('ksDrag', { detail: { x: dragX, y: 0 } }),
    )

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      slider.container.dispatchEvent(
        new CustomEvent('ksDragEnd', { detail: { x: dragX, y: 0 } }),
      )
      isDragging = false
      dragX = 0
    }, 80)
  }

  slider.on('created', () => {
    window.addEventListener('scroll', onScroll)
  })

  slider.on('destroyed', () => {
    window.removeEventListener('scroll', onScroll)
  })
}

export function GallerySlider({ gallery }: Props) {
  const [_, setCurrentSlide] = React.useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      loop: true,
      mode: 'free-snap',
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
            instanceRef.current?.next()
          }, 6000)
        }
        slider.on('created', () => {
          nextTimeout()
        })
        slider.on('dragStarted', () => clearTimeout(timeout))
        slider.on('animationEnded', nextTimeout)
        slider.on('detailsChanged', (s) => {
          s.track.details.slides.forEach((slide, index) => {
            const individualSlide = s.slides[index]
            if (window.innerWidth > 768) {
              individualSlide.style.opacity = slide.portion > 0.99 ? '1' : '0.6'
            } else {
              individualSlide.style.opacity = '1'
            }
          })
        })
      },
      WindowScrollToDrag,
    ],
  )

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {gallery.map((item) => {
          const media = item.image ?? undefined
          return (
            <div
              key={item.id}
              className="keen-slider__slide cursor-grab transition-opacity duration-200"
            >
              <div className="relative aspect-[4/3] w-full">
                <PayloadImage media={media} />
              </div>
            </div>
          )
        })}
      </div>
      {instanceRef.current && (
        <div className="hidden md:block">
          <NavArrow left onClick={() => instanceRef.current?.prev()} />
          <NavArrow onClick={() => instanceRef.current?.next()} />
        </div>
      )}
    </div>
  )
}
