import { describe, expect, it } from 'vitest'

import { todayInNZ } from '@/lib/utils/nz-date'

describe('todayInNZ', () => {
  it('is a day ahead of UTC on an NZ morning (NZDT, UTC+13)', () => {
    expect(todayInNZ(new Date('2026-11-17T20:00:00Z'))).toBe('2026-11-18')
  })

  it('matches UTC on an NZ afternoon', () => {
    expect(todayInNZ(new Date('2026-11-18T02:00:00Z'))).toBe('2026-11-18')
  })

  it('uses NZST (UTC+12) in winter', () => {
    expect(todayInNZ(new Date('2026-07-01T11:59:00Z'))).toBe('2026-07-01')
    expect(todayInNZ(new Date('2026-07-01T12:00:00Z'))).toBe('2026-07-02')
  })
})
