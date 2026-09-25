import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { ApprovedSwimPhotoDTO } from '@/queries/swims'
import { SwimsCarousel } from './SwimsCarousel'

const mockPhotos: ApprovedSwimPhotoDTO[] = [
  { id: '1', image: { id: 1, url: '/a.jpg', alt: 'Swim A' } as any },
  { id: '2', image: { id: 2, url: '/b.jpg', alt: 'Swim B' } as any },
  { id: '3', image: { id: 3, url: '/c.jpg', alt: 'Swim C' } as any },
]

describe('SwimsCarousel', () => {
  it('renders nothing when there are no approved photos', () => {
    const { container } = render(<SwimsCarousel photos={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a tile for each approved photo', () => {
    render(<SwimsCarousel photos={mockPhotos} />)
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('renders images with correct src and alt text', () => {
    render(<SwimsCarousel photos={mockPhotos} />)
    expect(screen.getByAltText('Swim A')).toHaveAttribute('src', '/a.jpg')
  })

  it('applies horizontal scroll container classes for responsiveness', () => {
    render(<SwimsCarousel photos={mockPhotos} />)
    expect(screen.getByTestId('swims-carousel')).toHaveClass('overflow-x-auto')
  })

  it('fills remaining slots with placeholders when fewer than 3 photos exist', () => {
    render(<SwimsCarousel photos={[mockPhotos[0]]} />)
    expect(screen.getAllByRole('img')).toHaveLength(1)
    expect(screen.getAllByTestId('swims-carousel-placeholder')).toHaveLength(2)
  })

  it('shows no placeholders when there are 3 or more photos', () => {
    render(<SwimsCarousel photos={mockPhotos} />)
    expect(
      screen.queryByTestId('swims-carousel-placeholder'),
    ).not.toBeInTheDocument()
  })

  it('does not wrap tiles onto multiple rows when there are more than 3 photos', () => {
    render(<SwimsCarousel photos={[...mockPhotos, mockPhotos[0]]} />) // 4 photos
    const carousel = screen.getByTestId('swims-carousel')
    expect(carousel).toHaveClass('flex')
    expect(carousel).not.toHaveClass('grid')
  })
})
