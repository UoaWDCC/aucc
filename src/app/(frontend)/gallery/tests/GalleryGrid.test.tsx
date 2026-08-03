import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { GalleryGrid } from '../_components/gallery-images/GalleryGrid'
import { NO_IMAGES_EMPTY_STATE_COPY } from '../_components/gallery-images/GalleryImage'

class IntersectionObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

describe('GalleryGrid', () => {
  beforeEach(() => {
    // @ts-expect-error - test mock
    global.IntersectionObserver = IntersectionObserverMock
  })

  it('renders the correct number of GalleryImage children for a given images prop', () => {
    const images = [
      { src: '/image1.jpg', alt: 'Image 1' },
      { src: '/image2.jpg', alt: 'Image 2' },
      { src: '/image3.jpg', alt: 'Image 3' },
    ]

    render(<GalleryGrid initialImages={images} initialHasMore={false} />)

    const galleryImages = screen.getAllByRole('img')
    expect(galleryImages).toHaveLength(images.length)
  })

  it('renders an empty state when images={[]}', () => {
    render(<GalleryGrid initialImages={[]} initialHasMore={false} />)

    expect(screen.getByTestId('gallery-empty-state')).not.toBeNull()
  })

  it('renders the empty-state copy', () => {
    render(<GalleryGrid initialImages={[]} initialHasMore={false} />)

    expect(screen.getByText(NO_IMAGES_EMPTY_STATE_COPY)).not.toBeNull()
  })

  it('does not render the empty state when images are present', () => {
    const images = [
      { src: '/image1.jpg', alt: 'Image 1' },
      { src: '/image2.jpg', alt: 'Image 2' },
    ]

    render(<GalleryGrid initialImages={images} initialHasMore={false} />)

    const noImagesText = screen.queryByTestId('gallery-empty-state')
    expect(noImagesText).toBeNull()
  })
  it(' has the expected responsive Tailwind class names', () => {
    const images = [
      { src: '/image1.jpg', alt: 'Image 1' },
      { src: '/image2.jpg', alt: 'Image 2' },
    ]

    render(<GalleryGrid initialImages={images} initialHasMore={false} />)

    const gridContainer = screen.getByTestId('gallery-grid')
    expect(gridContainer.className).toContain('grid')
    expect(gridContainer.className).toContain('justify-items-center')
    expect(gridContainer.className).toContain('sm:grid-cols-2')
    expect(gridContainer.className).toContain('md:grid-cols-3')
    expect(gridContainer.className).toContain('lg:grid-cols-4')
  })

  it(' matches the snapshot', () => {
    const images = [
      { src: '/image1.jpg', alt: 'Image 1' },
      { src: '/image2.jpg', alt: 'Image 2' },
    ]

    const { asFragment } = render(
      <GalleryGrid initialImages={images} initialHasMore={false} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
