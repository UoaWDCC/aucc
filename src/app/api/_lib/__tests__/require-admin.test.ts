import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getPayloadClient } from '@/lib/payload'
import { requireAdmin } from '../require-admin'

vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(),
}))

const makeRequest = (headers: Record<string, string> = {}) =>
  new Request('http://localhost:3000/api/admin/swims', { headers })

describe('requireAdmin', () => {
  const mockPayloadClient = {
    auth: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(getPayloadClient as any).mockResolvedValue(mockPayloadClient)
  })

  it('returns the user when the session is valid', async () => {
    const mockUser = { id: '1', email: 'admin@aucc.nz', name: 'Admin' }
    mockPayloadClient.auth.mockResolvedValue({ user: mockUser })

    const req = makeRequest({ cookie: 'payload-token=valid-token' })
    const result = await requireAdmin(req)

    expect(mockPayloadClient.auth).toHaveBeenCalledWith({
      headers: req.headers,
    })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.user).toEqual(mockUser)
    }
  })

  it('returns 401 when there is no session', async () => {
    mockPayloadClient.auth.mockResolvedValue({ user: null })

    const result = await requireAdmin(makeRequest())

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.response.status).toBe(401)
      expect(await result.response.json()).toEqual({ error: 'Unauthorized' })
    }
  })

  it('returns 401 when the token is expired or invalid', async () => {
    mockPayloadClient.auth.mockResolvedValue({ user: null })

    const result = await requireAdmin(
      makeRequest({ authorization: 'JWT expired.or.garbage' }),
    )

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.response.status).toBe(401)
    }
  })

  it('returns a generic 401 without leaking details when auth throws', async () => {
    mockPayloadClient.auth.mockRejectedValue(
      new Error('jwt malformed: secret internal detail'),
    )

    const result = await requireAdmin(
      makeRequest({ cookie: 'payload-token=broken' }),
    )

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.response.status).toBe(401)
      const body = await result.response.text()
      expect(body).not.toContain('secret internal detail')
      expect(JSON.parse(body)).toEqual({ error: 'Unauthorized' })
    }
  })
})
