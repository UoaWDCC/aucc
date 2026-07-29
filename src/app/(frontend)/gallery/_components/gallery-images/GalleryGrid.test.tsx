import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { GalleryGrid } from './GalleryGrid'

type PayloadGalleryDoc = {
  image: { url?: string; alt?: string } | number | null
}

class IntersectionObserverMock {
  static instances: IntersectionObserverMock[] = []
  callback: IntersectionObserverCallback
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    IntersectionObserverMock.instances.push(this)
  }
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  trigger(isIntersecting = true) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    )
  }
}

function latestObserver() {
  return IntersectionObserverMock.instances.at(-1)!
}

const initialImages = Array.from({ length: 12 }, (_, i) => ({
  src: `/image-${i}.jpg`,
  alt: `Image ${i}`,
}))

function mockPayloadResponse(
  images: { src: string; alt: string }[],
  hasNextPage: boolean,
) {
  return {
    json: async () => ({
      docs: images.map(
        (img): PayloadGalleryDoc => ({ image: { url: img.src, alt: img.alt } }),
      ),
      hasNextPage,
    }),
  }
}

describe('GalleryGrid infinite scroll', () => {
  beforeEach(() => {
    IntersectionObserverMock.instances = []
    // @ts-expect-error - test mock
    global.IntersectionObserver = IntersectionObserverMock
    global.fetch = vi.fn()
  })

  it('renders only the initial 12 images on load', () => {
    render(<GalleryGrid initialImages={initialImages} initialHasMore={true} />)
    expect(screen.getAllByRole('img')).toHaveLength(12)
  })

  it('fetches page 2 with limit 12 when the observer fires', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      mockPayloadResponse(
        [{ src: '/image-12.jpg', alt: 'Image 12' }],
        true,
      ) as Response,
    )

    render(<GalleryGrid initialImages={initialImages} initialHasMore={true} />)
    latestObserver().trigger()

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/gallery?page=2&limit=12')
    })
  })

  it('appends newly fetched images rather than replacing existing ones', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      mockPayloadResponse(
        [{ src: '/image-12.jpg', alt: 'Image 12' }],
        true,
      ) as Response,
    )

    render(<GalleryGrid initialImages={initialImages} initialHasMore={true} />)
    latestObserver().trigger()

    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(13)
    })
  })

  it('does not fetch again once hasMore is false', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      mockPayloadResponse([], false) as Response,
    )

    render(<GalleryGrid initialImages={initialImages} initialHasMore={true} />)
    const observer = latestObserver()
    observer.trigger()

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

    observer.trigger()
    await new Promise((r) => setTimeout(r, 0))

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('does not fire a second fetch while one is in-flight', async () => {
    let resolveFetch: (value: Response) => void = () => {}

    vi.mocked(fetch).mockReturnValueOnce(
      new Promise<Response>((resolve) => {
        resolveFetch = resolve
      }),
    )

    render(<GalleryGrid initialImages={initialImages} initialHasMore={true} />)
    const observer = latestObserver()

    observer.trigger()
    observer.trigger()

    expect(fetch).toHaveBeenCalledTimes(1)

    resolveFetch(mockPayloadResponse([], true) as Response)
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
  })
})
