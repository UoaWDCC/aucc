import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GalleryGrid } from '../_components/gallery-images/GalleryGrid'

describe('GalleryGrid', () => {
  it('renders the correct number of GalleryImage children for a given images prop', () => {
    const images = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
      { src: 'image3.jpg', alt: 'Image 3' },
    ]

    render(<GalleryGrid images={images} />)

    const galleryImages = screen.getAllByRole('img')
    expect(galleryImages).toHaveLength(images.length)
  })

  it('renders "No images yet" empty state when images={[]}', () => {
    render(<GalleryGrid images={[]} />)

    const noImagesText = screen.getByText(
      /There are no images available at this moment./i,
    )
    expect(noImagesText).not.toBeNull()
  })

  it(' does not render the empty state when images are present', () => {
    const images = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ]

    render(<GalleryGrid images={images} />)

    const noImagesText = screen.queryByText(
      /There are no images available at this moment./i,
    )
    expect(noImagesText).toBeNull()
  })
  it(' has the expected responsive Tailwind class names', () => {
    const images = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ]

    render(<GalleryGrid images={images} />)

    const gridContainer = screen.getByTestId('gallery-grid')
    expect(gridContainer.className).to.contain(
      'grid justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    )
  })

  it(' matches the snapshot', () => {
    const images = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ]

    const { asFragment } = render(<GalleryGrid images={images} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
