import { describe, expect, it } from 'vitest'

import { ALT_TEXT_REQUIRED_MESSAGE, Media, validateAltText } from '../media'

describe('media alt text', () => {
  it('accepts a description', () => {
    expect(validateAltText('Paddler on the Kaituna')).toBe(true)
  })

  it.each([undefined, null, '', '   '])('rejects %j', (value) => {
    expect(validateAltText(value)).toBe(ALT_TEXT_REQUIRED_MESSAGE)
  })

  it('is wired to the alt field without making the column NOT NULL', () => {
    const alt = Media.fields.find((f) => 'name' in f && f.name === 'alt')
    expect(alt).toMatchObject({ validate: validateAltText })
    expect(alt).not.toHaveProperty('required', true)
  })
})
