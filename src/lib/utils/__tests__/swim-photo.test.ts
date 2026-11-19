import { describe, expect, it } from 'vitest'

import { MAX_SWIM_PHOTO_BYTES, validateSwimPhoto } from '@/lib/utils/swim-photo'

describe('validateSwimPhoto', () => {
  const ok = { type: 'image/jpeg', size: 500_000 }

  it('accepts a supported photo with consent', () => {
    expect(validateSwimPhoto(ok, true)).toBeNull()
    expect(validateSwimPhoto({ ...ok, type: 'image/png' }, true)).toBeNull()
    expect(validateSwimPhoto({ ...ok, type: 'image/webp' }, true)).toBeNull()
  })

  it('accepts a photo exactly at the size limit', () => {
    expect(
      validateSwimPhoto({ ...ok, size: MAX_SWIM_PHOTO_BYTES }, true),
    ).toBeNull()
  })

  it('rejects unsupported types such as HEIC and GIF', () => {
    expect(validateSwimPhoto({ ...ok, type: 'image/heic' }, true)).toMatch(
      /JPG, PNG or WebP/,
    )
    expect(validateSwimPhoto({ ...ok, type: 'image/gif' }, true)).toMatch(
      /JPG, PNG or WebP/,
    )
  })

  it('rejects photos over the limit', () => {
    expect(
      validateSwimPhoto({ ...ok, size: MAX_SWIM_PHOTO_BYTES + 1 }, true),
    ).toMatch(/4 MB/)
  })

  it('requires consent', () => {
    expect(validateSwimPhoto(ok, false)).toMatch(/confirm/)
  })
})
