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
  { src: '/image1.jpg', alt: 'Image 1' },
  { src: '/image2.jpg', alt: 'Image 2' },
  { src: '/image3.jpg', alt: 'Image 3' },
]

const availableTags = ['Fulljames', 'Taupo', 'Wairoa']

function mockGalleryResponse(
  images: { src: string; alt: string }[],
  hasMore: boolean,
) {
  return {
    ok: true,
    json: async () => ({
      images: images.map(
        (img): PayloadGalleryDoc => ({ image: { url: img.src, alt: img.alt } }),
      ),
      hasMore,
    }),
  }
}

beforeEach(() => {
  IntersectionObserverMock.instances = []
  // @ts-expect-error - test mock
  global.IntersectionObserver = IntersectionObserverMock
  // Default so a filter change never hits an unmocked fetch; individual
  // tests override with mockResolvedValueOnce.
  global.fetch = vi.fn().mockResolvedValue(mockGalleryResponse([], false))
})

describe('GalleryGrid infinite scroll', () => {
  it('renders only the initial 12 images on load', () => {
    render(
      <GalleryGrid
        initialImages={initialImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )
    expect(screen.getAllByRole('img')).toHaveLength(12)
  })

  it('fetches page 2 with limit 12 when the observer fires', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      mockGalleryResponse(
        [{ src: '/image-12.jpg', alt: 'Image 12' }],
        true,
      ) as Response,
    )

    render(
      <GalleryGrid
        initialImages={initialImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )
    const observer = latestObserver()
    observer.trigger() // mandatory initial callback — ignored by the guard
    observer.trigger() // real scroll-triggered intersection

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/gallery-images?page=2&limit=12')
    })
  })

  it('appends newly fetched images rather than replacing existing ones', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      mockGalleryResponse(
        [{ src: '/image-12.jpg', alt: 'Image 12' }],
        true,
      ) as Response,
    )

    render(
      <GalleryGrid
        initialImages={initialImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )
    const observer = latestObserver()
    observer.trigger() // mandatory initial callback — ignored by the guard
    observer.trigger() // real scroll-triggered intersection

    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(13)
    })
  })

  it('does not fetch again once hasMore is false', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      mockGalleryResponse([], false) as Response,
    )

    render(
      <GalleryGrid
        initialImages={initialImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )
    const observer = latestObserver()
    observer.trigger() // mandatory initial callback — ignored by the guard
    observer.trigger() // first real intersection — triggers the fetch

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

    render(
      <GalleryGrid
        initialImages={initialImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )
    const observer = latestObserver()

    observer.trigger() // mandatory initial callback — ignored by the guard
    observer.trigger()
    observer.trigger()

    expect(fetch).toHaveBeenCalledTimes(1)

    resolveFetch(mockGalleryResponse([], true) as Response)
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
  })

  it('does not fetch on initial render even if the sentinel is already intersecting', async () => {
    render(
      <GalleryGrid
        initialImages={initialImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )
    latestObserver().trigger(true)
    await new Promise((r) => setTimeout(r, 0))
    expect(fetch).not.toHaveBeenCalled()
  })

  it('fetches on the first real intersection after the initial mount callback', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      mockGalleryResponse(
        [{ src: '/image-12.jpg', alt: 'Image 12' }],
        true,
      ) as Response,
    )
    render(
      <GalleryGrid
        initialImages={initialImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )
    const observer = latestObserver()
    observer.trigger(true)
    observer.trigger(true)
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })
})

describe('GalleryGrid filtering', () => {
  it('renders all images by default', () => {
    render(
      <GalleryGrid
        initialImages={mockImages}
        initialHasMore={false}
        availableTags={availableTags}
      />,
    )
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('renders the empty state when images is empty', () => {
    render(
      <GalleryGrid
        initialImages={[]}
        initialHasMore={false}
        availableTags={availableTags}
      />,
    )

    expect(screen.getByTestId('gallery-empty-state')).not.toBeNull()
    expect(screen.getByText(NO_IMAGES_EMPTY_STATE_COPY)).not.toBeNull()
  })

  it('opens the filter panel when the filter icon is clicked', async () => {
    const user = userEvent.setup()
    render(
      <GalleryGrid
        initialImages={mockImages}
        initialHasMore={false}
        availableTags={availableTags}
      />,
    )

    expect(screen.queryByText('All')).toBeNull()

    await user.click(screen.getByLabelText('Filter gallery images'))

    expect(screen.getByText('All')).not.toBeNull()
  })

  it('lists every tag passed in as a filter option', async () => {
    const user = userEvent.setup()
    render(
      <GalleryGrid
        initialImages={mockImages}
        initialHasMore={false}
        availableTags={availableTags}
      />,
    )

    await user.click(screen.getByLabelText('Filter gallery images'))

    expect(screen.getByText('Taupo')).not.toBeNull()
    expect(screen.getByText('Fulljames')).not.toBeNull()
    expect(screen.getByText('Wairoa')).not.toBeNull()
  })

  it('closes the filter panel after selecting a tag', async () => {
    const user = userEvent.setup()
    render(
      <GalleryGrid
        initialImages={mockImages}
        initialHasMore={false}
        availableTags={availableTags}
      />,
    )

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('Taupo'))

    expect(screen.queryByText('All')).toBeNull()
  })

  it('re-fetches from page 1 with the tag when a filter is selected', async () => {
    const user = userEvent.setup()
    vi.mocked(fetch).mockResolvedValueOnce(
      mockGalleryResponse(
        [{ src: '/taupo.jpg', alt: 'Taupo 1' }],
        false,
      ) as Response,
    )

    render(
      <GalleryGrid
        initialImages={mockImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('Taupo'))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/gallery-images?page=1&limit=12&tag=Taupo',
      )
    })
  })

  it('replaces the previous results rather than appending them', async () => {
    const user = userEvent.setup()
    vi.mocked(fetch).mockResolvedValueOnce(
      mockGalleryResponse(
        [{ src: '/taupo.jpg', alt: 'Taupo 1' }],
        false,
      ) as Response,
    )

    render(
      <GalleryGrid
        initialImages={mockImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('Taupo'))

    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(1)
    })
    expect(screen.queryByAltText('Image 1')).toBeNull()
  })

  it('re-fetches without the tag when "All" is selected', async () => {
    const user = userEvent.setup()
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        mockGalleryResponse(
          [{ src: '/taupo.jpg', alt: 'Taupo 1' }],
          false,
        ) as Response,
      )
      .mockResolvedValueOnce(mockGalleryResponse(mockImages, false) as Response)

    render(
      <GalleryGrid
        initialImages={mockImages}
        initialHasMore={false}
        availableTags={availableTags}
      />,
    )

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('Taupo'))
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(1))

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('All'))

    await waitFor(() => {
      expect(fetch).toHaveBeenLastCalledWith(
        '/api/gallery-images?page=1&limit=12',
      )
    })
  })

  it('keeps the tag on subsequent pages while filtered', async () => {
    const user = userEvent.setup()
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        mockGalleryResponse(
          [{ src: '/taupo.jpg', alt: 'Taupo 1' }],
          true,
        ) as Response,
      )
      .mockResolvedValueOnce(
        mockGalleryResponse(
          [{ src: '/taupo2.jpg', alt: 'Taupo 2' }],
          false,
        ) as Response,
      )

    render(
      <GalleryGrid
        initialImages={mockImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('Taupo'))
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(1))

    // The observer is rebuilt when the filter changes, so it swallows one
    // callback again before a real intersection counts.
    const observer = latestObserver()
    observer.trigger()
    observer.trigger()

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/gallery-images?page=2&limit=12&tag=Taupo',
      )
    })
  })
})

describe('GalleryGrid loading states', () => {
  function failedResponse() {
    return { ok: false, status: 500, json: async () => ({}) } as Response
  }

  it('shows an error with a retry button when a later page fails, then recovers', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(fetch)
      .mockResolvedValueOnce(failedResponse())
      .mockResolvedValueOnce(mockGalleryResponse(mockImages, false) as Response)

    render(
      <GalleryGrid
        initialImages={initialImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )
    const observer = latestObserver()
    observer.trigger() // initial mount callback — ignored
    observer.trigger()

    expect(await screen.findByTestId('gallery-load-error')).toBeInTheDocument()
    // The grid keeps the photos it already has.
    expect(screen.getAllByRole('img')).toHaveLength(12)

    // The observer does not retry by itself while the error is showing.
    observer.trigger()
    expect(fetch).toHaveBeenCalledTimes(1)

    await userEvent.click(screen.getByRole('button', { name: 'Try again' }))

    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(15))
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(screen.queryByTestId('gallery-load-error')).not.toBeInTheDocument()
  })

  it('shows an error instead of the empty state when a filter fails, and retries it', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(fetch)
      .mockResolvedValueOnce(failedResponse())
      .mockResolvedValueOnce(mockGalleryResponse(mockImages, false) as Response)

    render(
      <GalleryGrid
        initialImages={initialImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )
    await userEvent.click(
      screen.getByRole('button', { name: 'Filter gallery images' }),
    )
    await userEvent.click(screen.getByRole('button', { name: 'Taupo' }))

    expect(await screen.findByTestId('gallery-load-error')).toBeInTheDocument()
    expect(screen.queryByTestId('gallery-empty-state')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Try again' }))

    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(3))
    expect(fetch).toHaveBeenLastCalledWith(
      '/api/gallery-images?page=1&limit=12&tag=Taupo',
    )
  })

  it('shows a spinner while the next page loads', async () => {
    vi.mocked(fetch).mockReturnValueOnce(new Promise(() => {}))

    render(
      <GalleryGrid
        initialImages={initialImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )
    const observer = latestObserver()
    observer.trigger()
    observer.trigger()

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Loading photos',
    )
  })

  it('shows an end-of-gallery message only when there are no more pages', async () => {
    const { rerender } = render(
      <GalleryGrid
        initialImages={initialImages}
        initialHasMore={true}
        availableTags={availableTags}
      />,
    )
    expect(screen.queryByTestId('gallery-end')).not.toBeInTheDocument()

    rerender(
      <GalleryGrid
        key="no-more"
        initialImages={initialImages}
        initialHasMore={false}
        availableTags={availableTags}
      />,
    )
    expect(screen.getByTestId('gallery-end')).toBeInTheDocument()
  })
})
