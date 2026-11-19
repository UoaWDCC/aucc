import type { Access } from 'payload'
import { describe, expect, it } from 'vitest'

import { Swims } from '../swims'

const visitor = { req: { user: null } } as unknown as Parameters<Access>[0]
const admin = {
  req: { user: { id: 1, email: 'admin@example.com' } },
} as unknown as Parameters<Access>[0]

describe('Swims collection access', () => {
  it.each(['create', 'read', 'update', 'delete'] as const)(
    'only lets admins %s swims',
    (operation) => {
      const rule = Swims.access?.[operation] as Access

      expect(rule(visitor)).toBe(false)
      expect(rule(admin)).toBe(true)
    },
  )
})
