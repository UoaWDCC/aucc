import type { Field } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import { MerchContent } from '../merch-content'

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
}))

type NamedField = Field & { name: string; label?: unknown }

function namedFields(fields: Field[]): NamedField[] {
  return fields.filter((field): field is NamedField => 'name' in field)
}

function getSection(name: string) {
  const section = namedFields(MerchContent.fields).find(
    (field) => field.name === name,
  )

  if (!section || section.type !== 'group') {
    throw new Error(`Expected "${name}" to be a group field`)
  }

  return section
}

function getField(sectionName: string, fieldName: string) {
  return namedFields(getSection(sectionName).fields).find(
    (field) => field.name === fieldName,
  )
}

const sections = [
  'tshirts',
  'stickers',
  'boardShorts',
  'towelPoncho',
  'sweatshirt',
]

describe('MerchContent global', () => {
  it('uses the merch-content slug', () => {
    expect(MerchContent.slug).toBe('merch-content')
  })

  it('covers the five product sections', () => {
    expect(namedFields(MerchContent.fields).map((field) => field.name)).toEqual(
      sections,
    )
  })

  it.each(sections)(
    'gives the %s section a label, heading, body, image and badge',
    (section) => {
      expect(getField(section, 'label')?.type).toBe('text')
      expect(getField(section, 'heading')?.type).toBe('text')
      expect(getField(section, 'body')?.type).toBe('richText')
      expect(getField(section, 'image')?.type).toBe('upload')
      expect(getField(section, 'badge')?.type).toBe('text')
    },
  )

  it.each(sections)('labels every field in the %s section', (section) => {
    for (const field of namedFields(getSection(section).fields)) {
      expect(field.label, `${section}.${field.name}`).toBeTruthy()
    }
  })

  it('gives Towel Poncho annotations with text and a 0-100 topPercent', () => {
    const annotations = getField('towelPoncho', 'annotations')

    if (!annotations || annotations.type !== 'array') {
      throw new Error('Expected towelPoncho.annotations to be an array field')
    }

    const fields = namedFields(annotations.fields)
    const text = fields.find((field) => field.name === 'text')
    const topPercent = fields.find((field) => field.name === 'topPercent')

    expect(text?.type).toBe('text')
    expect(topPercent).toMatchObject({ type: 'number', min: 0, max: 100 })
  })

  it('gives Board Shorts a caption and a group photo upload', () => {
    expect(getField('boardShorts', 'caption')?.type).toBe('text')
    expect(getField('boardShorts', 'groupPhoto')?.type).toBe('upload')
  })

  it('gives Sweatshirt a year label and two side-by-side images', () => {
    expect(getField('sweatshirt', 'yearLabel')?.type).toBe('text')
    expect(getField('sweatshirt', 'imageLeft')?.type).toBe('upload')
    expect(getField('sweatshirt', 'imageRight')?.type).toBe('upload')
  })
})
