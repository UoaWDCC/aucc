import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SwimsList, type SwimRecordDTO } from './SwimsList'

const mockSwims: SwimRecordDTO[] = [
  {
    id: '1',
    date: '2026-03-14',
    trip: 'Kaituna Trip',
    river: 'Kaituna River',
    memberName: 'Jane Doe',
  },
  {
    id: '2',
    date: '2026-04-02',
    trip: 'Wairoa Weekender',
    river: 'Wairoa River',
    memberName: 'John Smith',
  },
]

describe('SwimsList', () => {
  it('renders the empty state when there are no swims', () => {
    render(<SwimsList swims={[]} />)
    expect(screen.getByTestId('swims-empty-state')).toBeInTheDocument()
    expect(screen.getByText('No swims logged yet')).toBeInTheDocument()
  })

  it('renders a row per swim record', () => {
    render(<SwimsList swims={mockSwims} />)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3)
  })

  it('displays date, trip, river, and member name for each swim', () => {
    render(<SwimsList swims={mockSwims} />)
    expect(screen.getByText('Kaituna Trip')).toBeInTheDocument()
    expect(screen.getByText('Kaituna River')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('Wairoa Weekender')).toBeInTheDocument()
    expect(screen.getByText('Wairoa River')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
  })

  it('does not render the empty state when swims are present', () => {
    render(<SwimsList swims={mockSwims} />)
    expect(screen.queryByTestId('swims-empty-state')).not.toBeInTheDocument()
  })
})
