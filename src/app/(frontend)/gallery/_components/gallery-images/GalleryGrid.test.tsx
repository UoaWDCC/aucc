import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { GalleryGrid } from './GalleryGrid'
import { NO_IMAGES_EMPTY_STATE_COPY } from './GalleryImage'

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

const mockImages = [
  { src: '/image1.jpg', alt: 'Image 1', tags: ['Taupo', 'Fulljames'] },
  { src: '/image2.jpg', alt: 'Image 2', tags: ['Taupo'] },
  { src: '/image3.jpg', alt: 'Image 3', tags: ['Wairoa'] },
]

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

beforeEach(() => {
  IntersectionObserverMock.instances = []
  // @ts-expect-error - test mock
  global.IntersectionObserver = IntersectionObserverMock
  global.fetch = vi.fn()
})

describe('GalleryGrid infinite scroll', () => {
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

describe('GalleryGrid filtering', () => {
  it('renders all images by default', () => {
    render(<GalleryGrid initialImages={mockImages} initialHasMore={false} />)
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('renders the empty state when images is empty', () => {
    render(<GalleryGrid initialImages={[]} initialHasMore={false} />)

    expect(screen.getByTestId('gallery-empty-state')).not.toBeNull()
    expect(screen.getByText(NO_IMAGES_EMPTY_STATE_COPY)).not.toBeNull()
  })

  it('opens the filter panel when the filter icon is clicked', async () => {
    const user = userEvent.setup()
    render(<GalleryGrid initialImages={mockImages} initialHasMore={false} />)

    expect(screen.queryByText('All')).toBeNull()

    await user.click(screen.getByLabelText('Filter gallery images'))

    expect(screen.getByText('All')).not.toBeNull()
  })

  it('lists every unique tag as a filter option', async () => {
    const user = userEvent.setup()
    render(<GalleryGrid initialImages={mockImages} initialHasMore={false} />)

    await user.click(screen.getByLabelText('Filter gallery images'))

    expect(screen.getByText('Taupo')).not.toBeNull()
    expect(screen.getByText('Fulljames')).not.toBeNull()
    expect(screen.getByText('Wairoa')).not.toBeNull()
  })

  it('deduplicates repeated tags across images', async () => {
    const user = userEvent.setup()
    render(<GalleryGrid initialImages={mockImages} initialHasMore={false} />)

    await user.click(screen.getByLabelText('Filter gallery images'))

    expect(screen.getAllByText('Taupo')).toHaveLength(1)
  })

  it('filters images by selected tag', async () => {
    const user = userEvent.setup()
    render(<GalleryGrid initialImages={mockImages} initialHasMore={false} />)

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('Wairoa'))

    expect(screen.getAllByRole('img')).toHaveLength(1)
    expect(screen.getByAltText('Image 3')).not.toBeNull()
  })

  it('restores all images when "All" is selected after filtering', async () => {
    const user = userEvent.setup()
    render(<GalleryGrid initialImages={mockImages} initialHasMore={false} />)

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('Wairoa'))
    expect(screen.getAllByRole('img')).toHaveLength(1)

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('All'))

    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('closes the filter panel after selecting a tag', async () => {
    const user = userEvent.setup()
    render(<GalleryGrid initialImages={mockImages} initialHasMore={false} />)

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('Taupo'))

    expect(screen.queryByText('All')).toBeNull()
  })
})
