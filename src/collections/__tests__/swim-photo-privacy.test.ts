/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { mediaRead } from '../_access/media-read'
import { deleteSwimPhoto } from '../_hooks/delete-swim-photo'
import { Media } from '../media'
import { Swims } from '../swims'

vi.mock('@/lib/utils/revalidation', () => ({
  cacheTags: {
    media: { revalidate: vi.fn() },
    swims: { revalidate: vi.fn() },
  },
}))

const makePayload = () => ({
  find: vi.fn(),
  findByID: vi.fn(),
  count: vi.fn(),
  delete: vi.fn(),
  logger: { error: vi.fn() },
})

describe('mediaRead', () => {
  let payload: ReturnType<typeof makePayload>

  beforeEach(() => {
    payload = makePayload()
  })

  it('is the read rule for the media collection', () => {
    expect(Media.access?.read).toBe(mediaRead)
  })

  it('lets signed-in admins read everything without a lookup', async () => {
    const result = await mediaRead({ req: { user: { id: 1 }, payload } } as any)

    expect(result).toBe(true)
    expect(payload.find).not.toHaveBeenCalled()
  })

  it('hides member-uploaded photos of unapproved swims from the public', async () => {
    payload.find.mockResolvedValue({
      docs: [
        { image: { id: 11, filename: 'swim-a.jpg' } },
        { image: { id: 12, filename: 'swim-b.png' } },
        // A library image an admin attached stays public
        { image: { id: 13, filename: 'kaituna.jpg' } },
        { image: null },
      ],
    })

    const result = await mediaRead({ req: { user: null, payload } } as any)

    expect(result).toEqual({ id: { not_in: [11, 12] } })
    expect(payload.find).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'swims',
        where: {
          and: [
            { approvedToShare: { not_equals: true } },
            { image: { exists: true } },
          ],
        },
        overrideAccess: true,
      }),
    )
  })

  it('allows all media when no swim photo is waiting for approval', async () => {
    payload.find.mockResolvedValue({ docs: [] })

    await expect(
      mediaRead({ req: { user: null, payload } } as any),
    ).resolves.toBe(true)
  })
})

describe('deleteSwimPhoto', () => {
  let payload: ReturnType<typeof makePayload>
  const run = (doc: unknown) =>
    deleteSwimPhoto({ doc, req: { payload } } as any)

  beforeEach(() => {
    payload = makePayload()
  })

  it('runs when a swim is deleted', () => {
    expect(Swims.hooks?.afterDelete).toContain(deleteSwimPhoto)
  })

  it("deletes the swim's uploaded photo when nothing else uses it", async () => {
    payload.findByID.mockResolvedValue({ id: 7, filename: 'swim-abc.jpg' })
    payload.count.mockResolvedValue({ totalDocs: 0 })

    await run({ id: 1, image: 7 })

    expect(payload.delete).toHaveBeenCalledWith(
      expect.objectContaining({ collection: 'media', id: 7 }),
    )
  })

  it('handles a populated image', async () => {
    payload.findByID.mockResolvedValue({ id: 7, filename: 'swim-abc.jpg' })
    payload.count.mockResolvedValue({ totalDocs: 0 })

    await run({ id: 1, image: { id: 7 } })

    expect(payload.delete).toHaveBeenCalled()
  })

  it('keeps an image an admin attached from the library', async () => {
    payload.findByID.mockResolvedValue({ id: 7, filename: 'kaituna.jpg' })

    await run({ id: 1, image: 7 })

    expect(payload.delete).not.toHaveBeenCalled()
  })

  it('keeps a photo another swim still uses', async () => {
    payload.findByID.mockResolvedValue({ id: 7, filename: 'swim-abc.jpg' })
    payload.count.mockResolvedValue({ totalDocs: 1 })

    await run({ id: 1, image: 7 })

    expect(payload.delete).not.toHaveBeenCalled()
  })

  it('does nothing for a swim without a photo', async () => {
    await run({ id: 1, image: null })

    expect(payload.findByID).not.toHaveBeenCalled()
  })

  it('logs instead of failing when the photo cannot be deleted', async () => {
    payload.findByID.mockResolvedValue({ id: 7, filename: 'swim-abc.jpg' })
    payload.count.mockResolvedValue({ totalDocs: 0 })
    payload.delete.mockRejectedValue(new Error('still used in: Gallery'))

    await expect(run({ id: 1, image: 7 })).resolves.toBeUndefined()
    expect(payload.logger.error).toHaveBeenCalled()
  })
})
