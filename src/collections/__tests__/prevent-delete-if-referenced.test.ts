import type { FlattenedField } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import {
  findRequiredReferencePaths,
  preventDeleteIfReferenced,
  valuesAtPath,
} from '../_hooks/prevent-delete-if-referenced'

// Minimal field shapes; the hook only reads these properties.
const fields = [
  { name: 'title', type: 'text' },
  { name: 'image', type: 'upload', relationTo: 'media', required: true },
  { name: 'optionalImage', type: 'upload', relationTo: 'media' },
  {
    name: 'gallery',
    type: 'upload',
    relationTo: 'media',
    required: true,
    hasMany: true,
  },
  { name: 'river', type: 'relationship', relationTo: 'rivers', required: true },
  {
    name: 'items',
    type: 'array',
    flattenedFields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true },
    ],
  },
  {
    name: 'hero',
    type: 'group',
    flattenedFields: [
      { name: 'photo', type: 'upload', relationTo: 'media', required: true },
    ],
  },
] as unknown as FlattenedField[]

describe('findRequiredReferencePaths', () => {
  it('finds required single references, including nested ones', () => {
    expect(findRequiredReferencePaths(fields, 'media')).toEqual([
      'image',
      'items.image',
      'hero.photo',
    ])
  })

  it('only matches the given collection', () => {
    expect(findRequiredReferencePaths(fields, 'rivers')).toEqual(['river'])
    expect(findRequiredReferencePaths(fields, 'tags')).toEqual([])
  })
})

describe('valuesAtPath', () => {
  it('reads top-level, grouped and array values', () => {
    const data = {
      image: 1,
      hero: { photo: 2 },
      items: [{ image: 3 }, { image: 4 }, { image: null }],
    }
    expect(valuesAtPath(data, 'image')).toEqual([1])
    expect(valuesAtPath(data, 'hero.photo')).toEqual([2])
    expect(valuesAtPath(data, 'items.image')).toEqual([3, 4])
    expect(valuesAtPath(data, 'missing.path')).toEqual([])
  })
})

const makeArgs = ({
  totalDocs = 0,
  globalData = {},
}: {
  totalDocs?: number
  globalData?: Record<string, unknown>
}) => {
  const payload = {
    config: {
      collections: [
        {
          slug: 'swims',
          labels: { singular: 'Swim', plural: 'Swims' },
          flattenedFields: [
            {
              name: 'river',
              type: 'relationship',
              relationTo: 'rivers',
              required: true,
            },
          ],
        },
      ],
      globals: [
        {
          slug: 'rivers-global',
          label: 'Rivers Page',
          flattenedFields: [
            {
              name: 'featuredRiver',
              type: 'relationship',
              relationTo: 'rivers',
              required: true,
            },
          ],
        },
      ],
    },
    count: vi.fn().mockResolvedValue({ totalDocs }),
    findGlobal: vi.fn().mockResolvedValue(globalData),
  }

  return {
    payload,
    args: {
      collection: { slug: 'rivers', labels: { singular: 'River' } },
      id: 7,
      req: { payload },
    } as unknown as Parameters<typeof preventDeleteIfReferenced>[0],
  }
}

describe('preventDeleteIfReferenced', () => {
  it('allows the delete when nothing references the document', async () => {
    const { args, payload } = makeArgs({})
    await expect(preventDeleteIfReferenced(args)).resolves.toBeUndefined()
    expect(payload.count).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'swims',
        where: { or: [{ river: { equals: 7 } }] },
      }),
    )
  })

  it('blocks the delete and names where the document is used', async () => {
    const { args } = makeArgs({
      totalDocs: 3,
      globalData: { featuredRiver: 7 },
    })
    await expect(preventDeleteIfReferenced(args)).rejects.toThrow(
      "This river can't be deleted because it's still used in: 3 Swims, Rivers Page.",
    )
  })

  it('uses the singular label for one document', async () => {
    const { args } = makeArgs({ totalDocs: 1 })
    await expect(preventDeleteIfReferenced(args)).rejects.toThrow(
      'still used in: 1 Swim.',
    )
  })

  it('ignores a global that points at a different document', async () => {
    const { args } = makeArgs({ globalData: { featuredRiver: 8 } })
    await expect(preventDeleteIfReferenced(args)).resolves.toBeUndefined()
  })
})
