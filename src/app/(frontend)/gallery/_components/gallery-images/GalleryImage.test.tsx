import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { GalleryImage } from './GalleryImage'

vi.mock('next/image', () => ({
  default: vi.fn(({ src, alt, fill, sizes, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : src.src}
      alt={alt}
      data-fill={fill ? 'true' : undefined}
      data-sizes={sizes}
      {...props}
    />
  )),
}))

describe('GalleryImage', () => {
  const image = {
    src: 'https://example.com/gallery-image.jpg',
    alt: 'Kayakers on a river',
  }

  it('renders an img with the correct src and alt attributes', () => {
    render(<GalleryImage src={image.src} alt={image.alt} />)

    const renderedImage = screen.getByRole('img', { name: image.alt })
    expect(renderedImage.getAttribute('src')).toBe(image.src)
    expect(renderedImage.getAttribute('alt')).toBe(image.alt)
  })

  it('renders the skeleton placeholder before the image loads', () => {
    render(<GalleryImage src={image.src} alt={image.alt} />)

    expect(screen.getByTestId('gallery-image-skeleton')).toBeTruthy()
    expect(screen.getByRole('img', { name: image.alt }).className).toContain(
      'opacity-0',
    )
  })

  it('transitions to the real image once onLoad fires', () => {
    render(<GalleryImage src={image.src} alt={image.alt} />)

    const renderedImage = screen.getByRole('img', { name: image.alt })
    fireEvent.load(renderedImage)

    expect(screen.queryByTestId('gallery-image-skeleton')).toBeNull()
    expect(renderedImage.className).toContain('opacity-100')
  })

  it('renders the error fallback when onError fires', () => {
    render(<GalleryImage src={image.src} alt={image.alt} />)

    fireEvent.error(screen.getByRole('img', { name: image.alt }))

    expect(screen.queryByRole('img', { name: image.alt })).toBeNull()
    expect(screen.queryByTestId('gallery-image-skeleton')).toBeNull()
    expect(screen.getByRole('alert').textContent).toBe('Image unavailable')
  })
})
