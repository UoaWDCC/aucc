import { describe, expect, it } from 'vitest'

import { emailKeyDomains, emailRateLimitKey } from '../email-key'

describe('emailRateLimitKey', () => {
  it('ignores case and surrounding spaces', () => {
    expect(emailRateLimitKey('  Alex@EXAMPLE.com ')).toBe('alex@example.com')
  })

  it('drops a plus tag on any domain', () => {
    expect(emailRateLimitKey('johndoe+marketing@outlook.com')).toBe(
      'johndoe@outlook.com',
    )
    expect(emailRateLimitKey('a+b+c@example.com')).toBe('a@example.com')
  })

  it('keeps dots outside Gmail', () => {
    expect(emailRateLimitKey('john.doe@outlook.com')).toBe(
      'john.doe@outlook.com',
    )
    expect(emailRateLimitKey('john.doe@aucklanduni.ac.nz')).toBe(
      'john.doe@aucklanduni.ac.nz',
    )
  })

  it('ignores dots and maps googlemail.com for Gmail', () => {
    for (const address of [
      'john.doe@gmail.com',
      'johndoe@gmail.com',
      'j.o.h.n.d.o.e+news@Gmail.com',
      'John.Doe@googlemail.com',
    ]) {
      expect(emailRateLimitKey(address)).toBe('johndoe@gmail.com')
    }
  })

  it('keeps a leading plus, which is not a tag', () => {
    expect(emailRateLimitKey('+x@example.com')).toBe('+x@example.com')
  })

  it('returns an empty key for something that is not an address', () => {
    expect(emailRateLimitKey('')).toBe('')
    expect(emailRateLimitKey('no-at-sign')).toBe('')
    expect(emailRateLimitKey('@example.com')).toBe('')
    expect(emailRateLimitKey('alex@')).toBe('')
  })
})

describe('emailKeyDomains', () => {
  it('returns both Gmail domains for a Gmail key', () => {
    expect(emailKeyDomains('johndoe@gmail.com')).toEqual([
      'gmail.com',
      'googlemail.com',
    ])
  })

  it('returns the key domain otherwise', () => {
    expect(emailKeyDomains('alex@example.com')).toEqual(['example.com'])
  })
})
