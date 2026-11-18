import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Media } from '@/payload-types'
import type { SwimDTO } from '@/queries/swims'
import { SwimsCarousel } from './SwimsCarousel'

function mockImage(overrides: Partial<Media>): Media {
  return {
    id: 1,
    filename: 'mock.jpg',
    url: '/mock.jpg',
    alt: 'Mock image',
    updatedAt: '',
    createdAt: '',
    ...overrides,
  } as Media
}

function mockRiver(id: number, name: string): SwimDTO['river'] {
  return { id, name } as SwimDTO['river']
}

const mockPhotos: SwimDTO[] = [
  {
    id: 1,
    date: '2026-03-14',
    tripName: 'Kaituna Trip',
    river: mockRiver(1, 'Kaituna River'),
    memberName: 'Jane Doe',
    image: mockImage({ id: 1, url: '/a.jpg', alt: 'Swim A' }),
  },
  {
    id: 2,
    date: '2026-04-02',
    tripName: 'Wairoa Weekender',
    river: mockRiver(2, 'Wairoa River'),
    memberName: 'John Smith',
    image: mockImage({ id: 2, url: '/b.jpg', alt: 'Swim B' }),
  },
  {
    id: 3,
    date: '2026-05-10',
    tripName: 'Rangitaiki Run',
    river: mockRiver(3, 'Rangitaiki River'),
    memberName: 'Alex Lee',
    image: mockImage({ id: 3, url: '/c.jpg', alt: 'Swim C' }),
  },
]

describe('SwimsCarousel', () => {
  it('renders nothing when there are no approved photos', () => {
    const { container } = render(<SwimsCarousel photos={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a tile for each approved photo (duplicated once for the loop)', () => {
    render(<SwimsCarousel photos={mockPhotos} />)
    expect(screen.getAllByRole('img')).toHaveLength(mockPhotos.length * 2)
  })

  it('renders images with correct src and alt text', () => {
    render(<SwimsCarousel photos={mockPhotos} />)
    const matches = screen.getAllByAltText('Swim A')
    expect(matches[0]).toHaveAttribute('src', '/a.jpg')
  })

  it('applies horizontal scroll container classes for responsiveness', () => {
    render(<SwimsCarousel photos={mockPhotos} />)
    expect(screen.getByTestId('swims-carousel')).toHaveClass('overflow-x-auto')
  })

  it('fills remaining slots with placeholders when fewer than 3 photos exist', () => {
    render(<SwimsCarousel photos={[mockPhotos[0]]} />)
    expect(screen.getAllByRole('img')).toHaveLength(2)
    expect(screen.getAllByTestId('swims-carousel-placeholder')).toHaveLength(4)
  })

  it('shows no placeholders when there are 3 or more photos', () => {
    render(<SwimsCarousel photos={mockPhotos} />)
    expect(
      screen.queryByTestId('swims-carousel-placeholder'),
    ).not.toBeInTheDocument()
  })

  it('hides the scrollbar via CSS while keeping the row scrollable', () => {
    render(<SwimsCarousel photos={mockPhotos} />)
    const carousel = screen.getByTestId('swims-carousel')
    expect(carousel.className).toContain('scrollbar-width:none')
  })
})
