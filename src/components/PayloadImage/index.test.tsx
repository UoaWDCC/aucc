import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import PLACEHOLDER from '@/assets/hero.webp'
import { Media } from '@/payload-types'
import { PayloadImage, selectOptimalImageSize } from './index'

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: vi.fn(({ src, alt, className, loader, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : src.src}
      alt={alt}
      className={className}
      data-testid="next-image"
      data-loader={loader ? 'custom' : 'default'}
      {...props}
    />
  )),
}))

// Mock the placeholder image
vi.mock('@/assets/hero.webp', () => ({
  default: 'mocked-placeholder.webp',
}))

describe('PayloadImage', () => {
  const mockMediaWithSizes: Media = {
    id: 1,
    url: 'original-image.jpg',
    alt: 'Test image',
    filename: 'test.jpg',
    mimeType: 'image/jpeg',
    filesize: 1000,
    width: 2000,
    height: 1500,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    sizes: {
      small: { width: 400, height: 300, url: 'small-image.jpg' },
      medium: { width: 800, height: 600, url: 'medium-image.jpg' },
      large: { width: 1200, height: 900, url: 'large-image.jpg' },
      extraLarge: { width: 1600, height: 1200, url: 'xl-image.jpg' },
      doubleExtraLarge: { width: 2000, height: 1500, url: 'xxl-image.jpg' },
    },
  }

  const mockMediaWithoutSizes: Media = {
    id: 2,
    url: 'no-sizes-image.jpg',
    alt: 'No sizes image',
    filename: 'no-sizes.jpg',
    mimeType: 'image/jpeg',
    filesize: 1000,
    width: 1000,
    height: 750,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    sizes: {},
  }

  describe('when media is not provided', () => {
    it('should render placeholder image', () => {
      render(<PayloadImage media={undefined} />)

      const image = screen.getByTestId('next-image')
      expect(image.getAttribute('src')).toBe(PLACEHOLDER)
      expect(image.getAttribute('alt')).toBe('Placeholder image')
      expect(image.getAttribute('data-loader')).toBe('default')
    })

    it('should use custom placeholder when provided', () => {
      const customPlaceholder = 'custom-placeholder.jpg'
      render(<PayloadImage media={undefined} placeholder={customPlaceholder} />)

      const image = screen.getByTestId('next-image')
      expect(image.getAttribute('src')).toBe(customPlaceholder)
    })
  })

  describe('when media is provided', () => {
    it('should render media image with custom loader', () => {
      render(<PayloadImage media={mockMediaWithSizes} />)

      const image = screen.getByTestId('next-image')
      expect(image.getAttribute('src')).toBe(mockMediaWithSizes.url)
      expect(image.getAttribute('alt')).toBe(mockMediaWithSizes.alt)
      expect(image.getAttribute('data-loader')).toBe('custom')
    })

    it('should handle missing alt text', () => {
      const mediaWithoutAlt = { ...mockMediaWithSizes, alt: undefined }
      render(<PayloadImage media={mediaWithoutAlt} />)

      const image = screen.getByTestId('next-image')
      expect(image.getAttribute('alt')).toBe('')
    })

    it('should handle missing url', () => {
      const mediaWithoutUrl = { ...mockMediaWithSizes, url: undefined }
      render(<PayloadImage media={mediaWithoutUrl} />)

      const image = screen.getByTestId('next-image')
      expect(image.getAttribute('src')).toBe(null)
    })
  })

  describe('loader function', () => {
    it('should select smallest adequate size for requested width', () => {
      render(<PayloadImage media={mockMediaWithSizes} />)

      // We can't directly test the loader function, but we can verify it's being used
      const image = screen.getByTestId('next-image')
      expect(image.getAttribute('data-loader')).toBe('custom')
    })

    it('should handle media without sizes', () => {
      render(<PayloadImage media={mockMediaWithoutSizes} />)

      const image = screen.getByTestId('next-image')
      expect(image.getAttribute('data-loader')).toBe('custom')
      expect(image.getAttribute('src')).toBe(mockMediaWithoutSizes.url)
    })

    it('should handle media with partial sizes', () => {
      const mediaWithPartialSizes: Media = {
        ...mockMediaWithSizes,
        sizes: {
          small: { width: 400, height: 300, url: 'small-image.jpg' },
          // missing medium, large, etc.
          doubleExtraLarge: { width: 2000, height: 1500, url: 'xxl-image.jpg' },
        },
      }

      render(<PayloadImage media={mediaWithPartialSizes} />)

      const image = screen.getByTestId('next-image')
      expect(image.getAttribute('data-loader')).toBe('custom')
    })

    it('should handle media with undefined sizes', () => {
      const mediaWithUndefinedSizes: Media = {
        ...mockMediaWithSizes,
        sizes: {
          small: undefined,
          medium: undefined,
          large: undefined,
          extraLarge: undefined,
          doubleExtraLarge: undefined,
        },
      }

      render(<PayloadImage media={mediaWithUndefinedSizes} />)

      const image = screen.getByTestId('next-image')
      expect(image.getAttribute('data-loader')).toBe('custom')
    })
  })

  describe('accessibility', () => {
    it('should have proper alt text for media images', () => {
      render(<PayloadImage media={mockMediaWithSizes} />)

      const image = screen.getByTestId('next-image')
      expect(image.getAttribute('alt')).toBe(mockMediaWithSizes.alt)
    })

    it('should have descriptive alt text for placeholder', () => {
      render(<PayloadImage media={undefined} />)

      const image = screen.getByTestId('next-image')
      expect(image.getAttribute('alt')).toBe('Placeholder image')
    })
  })
})

describe('selectOptimalImageSize', () => {
  const mockSizes = [
    { width: 400, url: 'image-400.jpg' },
    { width: 800, url: 'image-800.jpg' },
    { width: 1200, url: 'image-1200.jpg' },
    { width: 1600, url: 'image-1600.jpg' },
  ]
  const fallbackSrc = 'original-image.jpg'

  it('should return the exact match when requested width matches exactly', () => {
    const result = selectOptimalImageSize(mockSizes, 800, fallbackSrc)
    expect(result).toBe('image-800.jpg')
  })

  describe('when requested width is smaller than smallest size', () => {
    it('should return the smallest available size', () => {
      const result = selectOptimalImageSize(mockSizes, 200, fallbackSrc)
      expect(result).toBe('image-400.jpg')
    })

    it('should handle edge case of width 0', () => {
      const result = selectOptimalImageSize(mockSizes, 0, fallbackSrc)
      expect(result).toBe('image-400.jpg')
    })
  })

  it('should return the next larger size when requested width is between two sizes', () => {
    const result = selectOptimalImageSize(mockSizes, 600, fallbackSrc)
    expect(result).toBe('image-800.jpg')
  })

  it('should return the largest size when requested width very large', () => {
    const result = selectOptimalImageSize(mockSizes, 9999, fallbackSrc)
    expect(result).toBe('image-1600.jpg')
  })

  it('should return fallback src for empty array', () => {
    const result = selectOptimalImageSize([], 800, fallbackSrc)
    expect(result).toBe(fallbackSrc)
  })

  it('should handle single size correctly', () => {
    const singleSize = [{ width: 800, url: 'single-800.jpg' }]

    expect(selectOptimalImageSize(singleSize, 400, fallbackSrc)).toBe(
      'single-800.jpg',
    )
    expect(selectOptimalImageSize(singleSize, 800, fallbackSrc)).toBe(
      'single-800.jpg',
    )
    expect(selectOptimalImageSize(singleSize, 1200, fallbackSrc)).toBe(
      'single-800.jpg',
    )
  })

  it('should handle unsorted sizes correctly', () => {
    const unsortedSizes = [
      { width: 1200, url: 'image-1200.jpg' },
      { width: 400, url: 'image-400.jpg' },
      { width: 800, url: 'image-800.jpg' },
    ]

    const result = selectOptimalImageSize(unsortedSizes, 600, fallbackSrc)
    expect(result).toBe('image-800.jpg')
  })
})
