import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { SwimsLogForm } from './SwimsLogForm'

vi.mock('@/lib/env', () => ({
  env: { NEXT_PUBLIC_CF_URL: 'https://cdn.example.test' },
}))

const rivers = [{ id: 1, name: 'Kaituna' }]

function fillValidForm() {
  fireEvent.change(screen.getByLabelText('Name:'), {
    target: { value: 'Alex Paddler' },
  })
  fireEvent.change(screen.getByLabelText('Email:'), {
    target: { value: 'alex@example.com' },
  })
  fireEvent.change(screen.getByLabelText('River Name:'), {
    target: { value: '1' },
  })
  fireEvent.change(screen.getByLabelText('Date Swam:'), {
    target: { value: '2026-01-10' },
  })
  fireEvent.change(screen.getByLabelText('Trip:'), {
    target: { value: 'Summer trip' },
  })
}

describe('SwimsLogForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('allows only one submission while the request is pending, even after an edit', async () => {
    let resolveFetch: (response: Response) => void = () => {}
    const fetchMock = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve
        }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const { container } = render(
      <SwimsLogForm rivers={rivers} approvedPhotos={[]} />,
    )
    const form = container.querySelector('form')!
    fillValidForm()

    await act(async () => {
      fireEvent.submit(form)
    })
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const submit = screen.getByRole('button', { name: 'SENDING...' })
    const name = screen.getByLabelText('Name:')
    expect(submit).toBeDisabled()
    expect(name).toBeDisabled()

    // Editing a field must not re-enable Submit or allow a second request
    fireEvent.change(name, { target: { value: 'Alex P' } })
    expect(submit).toBeDisabled()
    await act(async () => {
      fireEvent.submit(form)
    })
    expect(fetchMock).toHaveBeenCalledTimes(1)

    await act(async () => {
      resolveFetch(new Response(null, { status: 201 }))
    })
    expect(
      await screen.findByText('Thanks, your swim has been logged.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeEnabled()
    expect(screen.getByLabelText('Name:')).toBeEnabled()
  })
})
