import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { FilterableGalleryGrid } from '../_components/gallery-images/FilterableGalleryGrid'
import { NO_IMAGES_EMPTY_STATE_COPY } from '../_components/gallery-images/GalleryImage'

const mockImages = [
  { src: '/image1.jpg', alt: 'Image 1', tags: ['Taupo', 'Fulljames'] },
  { src: '/image2.jpg', alt: 'Image 2', tags: ['Taupo'] },
  { src: '/image3.jpg', alt: 'Image 3', tags: ['Wairoa'] },
]

describe('FilterableGalleryGrid', () => {
  it('renders all images by default', () => {
    render(<FilterableGalleryGrid images={mockImages} />)
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('renders the empty state when images is empty', () => {
    render(<FilterableGalleryGrid images={[]} />)

    expect(screen.getByTestId('gallery-empty-state')).not.toBeNull()
    expect(screen.getByText(NO_IMAGES_EMPTY_STATE_COPY)).not.toBeNull()
  })

  it('opens the filter panel when the filter icon is clicked', async () => {
    const user = userEvent.setup()
    render(<FilterableGalleryGrid images={mockImages} />)

    expect(screen.queryByText('All')).toBeNull()

    await user.click(screen.getByLabelText('Filter gallery images'))

    expect(screen.getByText('All')).not.toBeNull()
  })

  it('lists every unique tag as a filter option', async () => {
    const user = userEvent.setup()
    render(<FilterableGalleryGrid images={mockImages} />)

    await user.click(screen.getByLabelText('Filter gallery images'))

    expect(screen.getByText('Taupo')).not.toBeNull()
    expect(screen.getByText('Fulljames')).not.toBeNull()
    expect(screen.getByText('Wairoa')).not.toBeNull()
  })

  it('deduplicates repeated tags across images', async () => {
    const user = userEvent.setup()
    render(<FilterableGalleryGrid images={mockImages} />)

    await user.click(screen.getByLabelText('Filter gallery images'))

    expect(screen.getAllByText('Taupo')).toHaveLength(1)
  })

  it('filters images by selected tag', async () => {
    const user = userEvent.setup()
    render(<FilterableGalleryGrid images={mockImages} />)

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('Wairoa'))

    expect(screen.getAllByRole('img')).toHaveLength(1)
    expect(screen.getByAltText('Image 3')).not.toBeNull()
  })

  it('restores all images when "All" is selected after filtering', async () => {
    const user = userEvent.setup()
    render(<FilterableGalleryGrid images={mockImages} />)

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('Wairoa'))
    expect(screen.getAllByRole('img')).toHaveLength(1)

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('All'))

    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('closes the filter panel after selecting a tag', async () => {
    const user = userEvent.setup()
    render(<FilterableGalleryGrid images={mockImages} />)

    await user.click(screen.getByLabelText('Filter gallery images'))
    await user.click(screen.getByText('Taupo'))

    expect(screen.queryByText('All')).toBeNull()
  })
})
