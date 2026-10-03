import { describe, expect, it } from 'vitest'

import { Swims } from '../swims'

describe('Swims collection honeypot hook', () => {
  it('rejects when honeypot is filled', async () => {
    const hook = Swims.hooks?.beforeChange?.[0]
    expect(hook).toBeTruthy()

    await expect(
      // @ts-ignore - calling hook directly with minimal args
      Promise.resolve().then(() => hook({ data: { honeypot: 'spam' } })),
    ).rejects.toThrow()
  })

  it('allows when honeypot is empty', async () => {
    const hook = Swims.hooks?.beforeChange?.[0]
    // @ts-ignore
    const out = await hook({ data: { email: 'a@b.com' } })
    expect(out).toBeDefined()
    expect(out.email).toBe('a@b.com')
  })
})
