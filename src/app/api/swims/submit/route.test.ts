// @vitest-environment node
// Route handlers run on the server. jsdom's FormData and File can't be read
// by Next's request parser, so multipart tests need the Node environment.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  countRecentSwimsByEmail,
  createSwim,
  createSwimPhoto,
  deleteSwimPhoto,
} from '@/queries/swims'
import { EMAIL_LIMIT, IP_LIMIT, swimSubmitIpLimiter } from './rate-limit'
import { POST } from './route'

vi.mock('@/queries/swims', () => ({
  countRecentSwimsByEmail: vi.fn(),
  createSwim: vi.fn(),
  createSwimPhoto: vi.fn(),
  deleteSwimPhoto: vi.fn(),
}))

const validBody = {
  memberName: 'Carl',
  date: '2026-09-01',
  tripName: 'Winter trip',
  river: 1,
  email: 'carl@example.com',
}

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/swims/submit', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/swims/submit', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    swimSubmitIpLimiter.reset()
    ;(countRecentSwimsByEmail as any).mockResolvedValue(0)
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

  it('ignores a media id sent by the client', async () => {
    // Public clients must not be able to attach someone else's media
    ;(createSwim as any).mockResolvedValue({ id: 'swim-3' })

    await POST(makeRequest({ ...validBody, image: 5 }))

    expect(createSwim).toHaveBeenCalledWith(validBody)
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
    const request = new NextRequest('http://localhost/api/swims/submit', {
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

  it('returns 400 when the river does not exist', async () => {
    ;(createSwim as any).mockRejectedValue(
      Object.assign(new Error('violates foreign key constraint'), {
        code: '23503',
      }),
    )

    const response = await POST(makeRequest({ ...validBody, river: 9999 }))
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.fields.river).toBe('That river does not exist')
  })

  it('returns 400 when a wrapped error is a foreign key violation', async () => {
    ;(createSwim as any).mockRejectedValue(
      new Error('Failed query', { cause: { code: '23503' } }),
    )

    const response = await POST(makeRequest({ ...validBody, river: 9999 }))

    expect(response.status).toBe(400)
  })

  it('rejects the submission when the honeypot is filled', async () => {
    const response = await POST(
      makeRequest({ ...validBody, honeypot: 'http://spam.example' }),
    )

    expect(response.status).toBe(400)
    expect(createSwim).not.toHaveBeenCalled()
  })

  it('ignores an empty honeypot', async () => {
    ;(createSwim as any).mockResolvedValue({ id: 'swim-4' })

    const response = await POST(makeRequest({ ...validBody, honeypot: '' }))

    expect(response.status).toBe(201)
    expect(createSwim).toHaveBeenCalledWith(validBody)
  })

  describe('rate limiting', () => {
    const fromIp = (ip: string) =>
      new NextRequest('http://localhost/api/swims/submit', {
        method: 'POST',
        body: JSON.stringify(validBody),
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': `${ip}, 10.0.0.1`,
        },
      })

    beforeEach(() => {
      ;(createSwim as any).mockResolvedValue({ id: 1, ...validBody })
    })

    it('returns 429 with Retry-After once an IP goes over the limit', async () => {
      for (let i = 0; i < IP_LIMIT; i++) {
        expect((await POST(fromIp('203.0.113.5'))).status).toBe(201)
      }

      const response = await POST(fromIp('203.0.113.5'))
      expect(response.status).toBe(429)
      expect(Number(response.headers.get('Retry-After'))).toBeGreaterThan(0)
      expect(createSwim).toHaveBeenCalledTimes(IP_LIMIT)
    })

    it('counts each IP separately', async () => {
      for (let i = 0; i < IP_LIMIT; i++) await POST(fromIp('203.0.113.5'))

      expect((await POST(fromIp('198.51.100.7'))).status).toBe(201)
    })

    it('returns 429 when the email has logged too many recent swims', async () => {
      ;(countRecentSwimsByEmail as any).mockResolvedValue(EMAIL_LIMIT)

      const response = await POST(makeRequest(validBody))

      expect(response.status).toBe(429)
      expect(countRecentSwimsByEmail).toHaveBeenCalledWith(
        validBody.email,
        expect.any(Date),
      )
      expect(createSwim).not.toHaveBeenCalled()
    })

    it('lets the submission through if the email count fails', async () => {
      ;(countRecentSwimsByEmail as any).mockRejectedValue(new Error('db down'))
      vi.spyOn(console, 'error').mockImplementation(() => {})

      expect((await POST(makeRequest(validBody))).status).toBe(201)
    })
  })

  describe('with a photo (multipart form)', () => {
    function makeFormRequest({
      photo,
      consent = true,
      fields = validBody,
    }: {
      photo?: File
      consent?: boolean
      fields?: Record<string, unknown>
    }) {
      const form = new FormData()
      for (const [key, value] of Object.entries(fields)) {
        form.set(key, String(value))
      }
      if (photo) {
        form.set('photo', photo)
        form.set('photoConsent', String(consent))
      }
      return new NextRequest('http://localhost/api/swims/submit', {
        method: 'POST',
        body: form,
      })
    }

    const jpeg = (bytes = 1024, name = 'IMG_1234.HEIC.jpg') =>
      new File([new Uint8Array(bytes)], name, { type: 'image/jpeg' })

    it('accepts a form submission without a photo', async () => {
      ;(createSwim as any).mockResolvedValue({ id: 'swim-6' })

      const response = await POST(makeFormRequest({}))

      expect(response.status).toBe(201)
      expect(createSwimPhoto).not.toHaveBeenCalled()
      expect(createSwim).toHaveBeenCalledWith(validBody)
    })

    it('stores the photo and links it to the swim', async () => {
      ;(createSwimPhoto as any).mockResolvedValue(42)
      ;(createSwim as any).mockResolvedValue({ id: 'swim-7' })

      const response = await POST(makeFormRequest({ photo: jpeg() }))

      expect(response.status).toBe(201)
      expect(createSwimPhoto).toHaveBeenCalledTimes(1)
      const [file, alt] = (createSwimPhoto as any).mock.calls[0]
      expect(file.mimetype).toBe('image/jpeg')
      expect(file.size).toBe(1024)
      expect(file.data).toBeInstanceOf(Buffer)
      // The uploaded file name is replaced with a random, unguessable one
      expect(file.name).toMatch(
        /^swim-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jpg$/,
      )
      expect(alt).toBe('Winter trip (2026-09-01)')
      expect(createSwim).toHaveBeenCalledWith({ ...validBody, image: 42 })
    })

    it('rejects a photo without consent', async () => {
      const response = await POST(
        makeFormRequest({ photo: jpeg(), consent: false }),
      )
      const body = await response.json()

      expect(response.status).toBe(400)
      expect(body.fields.photo).toMatch(/confirm/)
      expect(createSwimPhoto).not.toHaveBeenCalled()
      expect(createSwim).not.toHaveBeenCalled()
    })

    it('rejects a photo over 4 MB', async () => {
      const response = await POST(
        makeFormRequest({ photo: jpeg(4 * 1024 * 1024 + 1) }),
      )
      const body = await response.json()

      expect(response.status).toBe(400)
      expect(body.fields.photo).toMatch(/4 MB/)
      expect(createSwimPhoto).not.toHaveBeenCalled()
    })

    it('rejects a file that is not a supported image type', async () => {
      const pdf = new File([new Uint8Array(10)], 'notes.pdf', {
        type: 'application/pdf',
      })

      const response = await POST(makeFormRequest({ photo: pdf }))
      const body = await response.json()

      expect(response.status).toBe(400)
      expect(body.fields.photo).toMatch(/JPG, PNG or WebP/)
      expect(createSwimPhoto).not.toHaveBeenCalled()
    })

    it('removes the stored photo if the swim cannot be saved', async () => {
      ;(createSwimPhoto as any).mockResolvedValue(42)
      ;(createSwim as any).mockRejectedValue(new Error('db down'))

      const response = await POST(makeFormRequest({ photo: jpeg() }))

      expect(response.status).toBe(500)
      expect(deleteSwimPhoto).toHaveBeenCalledWith(42)
    })

    it('removes the stored photo if the river does not exist', async () => {
      ;(createSwimPhoto as any).mockResolvedValue(42)
      ;(createSwim as any).mockRejectedValue(
        Object.assign(new Error('violates foreign key constraint'), {
          code: '23503',
        }),
      )

      const response = await POST(makeFormRequest({ photo: jpeg() }))

      expect(response.status).toBe(400)
      expect(deleteSwimPhoto).toHaveBeenCalledWith(42)
    })

    it('rejects a filled honeypot before storing anything', async () => {
      const response = await POST(
        makeFormRequest({
          photo: jpeg(),
          fields: { ...validBody, honeypot: 'spam' },
        }),
      )

      expect(response.status).toBe(400)
      expect(createSwimPhoto).not.toHaveBeenCalled()
      expect(createSwim).not.toHaveBeenCalled()
    })
  })

  describe('in New Zealand time', () => {
    afterEach(() => {
      vi.useRealTimers()
    })

    it("accepts today's NZ date while UTC is still on the previous day", async () => {
      // 9am on 18 Nov in Auckland (NZDT, UTC+13) is 8pm on 17 Nov UTC
      vi.useFakeTimers({ toFake: ['Date'] })
      vi.setSystemTime(new Date('2026-11-17T20:00:00Z'))
      ;(createSwim as any).mockResolvedValue({ id: 'swim-5' })

      const response = await POST(
        makeRequest({ ...validBody, date: '2026-11-18' }),
      )

      expect(response.status).toBe(201)
    })

    it('still rejects tomorrow in NZ', async () => {
      vi.useFakeTimers({ toFake: ['Date'] })
      vi.setSystemTime(new Date('2026-11-17T20:00:00Z'))

      const response = await POST(
        makeRequest({ ...validBody, date: '2026-11-19' }),
      )

      expect(response.status).toBe(400)
      expect(createSwim).not.toHaveBeenCalled()
    })
  })
})
