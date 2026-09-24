/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createSwim } from '@/queries/swims'
import { POST } from './route'

vi.mock('@/queries/swims', () => ({
  createSwim: vi.fn(),
}))

const validBody = {
  memberName: 'Carl',
  date: '2026-09-01',
  tripName: 'Winter trip',
  river: 1,
  email: 'carl@example.com',
}

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/swims', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/swims', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 201 with the created record on valid input', async () => {
    const created = { id: 'swim-1', ...validBody }
    ;(createSwim as any).mockResolvedValue(created)

    const response = await POST(makeRequest(validBody))
    const responseBody = await response.json()

    expect(response.status).toBe(201)
    expect(responseBody).toEqual({ swim: created })
    expect(createSwim).toHaveBeenCalledWith(validBody)
  })

  it('accepts a numeric river id sent as a string', async () => {
    ;(createSwim as any).mockResolvedValue({ id: 'swim-2' })

    await POST(makeRequest({ ...validBody, river: '1' }))

    expect(createSwim).toHaveBeenCalledWith(validBody)
  })

  it('passes the image through when one is supplied', async () => {
    ;(createSwim as any).mockResolvedValue({ id: 'swim-3' })

    await POST(makeRequest({ ...validBody, image: 5 }))

    expect(createSwim).toHaveBeenCalledWith({ ...validBody, image: 5 })
  })

  it('returns 400 when required fields are missing', async () => {
    const response = await POST(makeRequest({}))
    const responseBody = await response.json()

    expect(response.status).toBe(400)
    expect(responseBody.fields.memberName).toBeDefined()
    expect(responseBody.fields.date).toBeDefined()
    expect(responseBody.fields.tripName).toBeDefined()
    expect(responseBody.fields.river).toBeDefined()
    expect(responseBody.fields.email).toBeDefined()
    expect(createSwim).not.toHaveBeenCalled()
  })

  it('returns 400 when the river is not a numeric id', async () => {
    const response = await POST(makeRequest({ ...validBody, river: 'Kaituna' }))
    const responseBody = await response.json()

    expect(response.status).toBe(400)
    expect(responseBody.fields.river).toBeDefined()
    expect(createSwim).not.toHaveBeenCalled()
  })

  it('returns 400 when the image is not a numeric id', async () => {
    const response = await POST(
      makeRequest({ ...validBody, image: 'photo.jpg' }),
    )
    const responseBody = await response.json()

    expect(response.status).toBe(400)
    expect(responseBody.fields.image).toBeDefined()
    expect(createSwim).not.toHaveBeenCalled()
  })

  it('returns 400 when the email is malformed', async () => {
    const response = await POST(
      makeRequest({ ...validBody, email: 'not-an-email' }),
    )
    const responseBody = await response.json()

    expect(response.status).toBe(400)
    expect(responseBody.fields.email).toBeDefined()
    expect(createSwim).not.toHaveBeenCalled()
  })

  it('returns 400 when the date is in the future', async () => {
    const response = await POST(
      makeRequest({ ...validBody, date: '2099-01-01' }),
    )
    const responseBody = await response.json()

    expect(response.status).toBe(400)
    expect(responseBody.fields.date).toBeDefined()
    expect(createSwim).not.toHaveBeenCalled()
  })

  it('returns 400 when the body is not valid JSON', async () => {
    const request = new NextRequest('http://localhost/api/swims', {
      method: 'POST',
      body: 'not json',
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    expect(createSwim).not.toHaveBeenCalled()
  })

  it('returns 500 when the create fails', async () => {
    ;(createSwim as any).mockRejectedValue(new Error('db down'))

    const response = await POST(makeRequest(validBody))

    expect(response.status).toBe(500)
  })
})
