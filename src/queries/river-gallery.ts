import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'
import { getGalleryByTag } from '@/queries/gallery'

// Preserve the full Media object from Payload so downstream components
// can use PayloadImage optimizations (sizes, formats, etc.). Keep DTO
// minimal (id + media) but don't flatten the Media.
export type RiverGalleryImageDTO = {
  id: string
  image: Media
}

const toDTO = (u: any, id: string, alt = ''): RiverGalleryImageDTO | null =>
  u?.url
    ? ({
        id,
        image: {
          // copy through the important fields from the Payload media object
          id: u.id ?? 0,
          url: u.url,
          alt: u.alt ?? alt,
          width: u.width ?? null,
          height: u.height ?? null,
          updatedAt: u.updatedAt ?? new Date().toISOString(),
          createdAt: u.createdAt ?? new Date().toISOString(),
          filename: u.filename ?? null,
          mimeType: u.mimeType ?? null,
          filesize: u.filesize ?? null,
          thumbnailURL: u.thumbnailURL ?? null,
          focalX: u.focalX ?? null,
          focalY: u.focalY ?? null,
          prefix: u.prefix ?? null,
          sizes: u.sizes ?? undefined,
        } as Media,
      } as RiverGalleryImageDTO)
    : null

const dedupeByUrl = <T extends { image: { url?: string | null } }>(arr: T[]) =>
  Array.from(
    new Map(
      arr
        .filter((i) => i.image.url) // Filter out items without URLs
        .map((i) => [i.image.url!, i]),
    ).values(),
  )

const titleCase = (s: string) =>
  s
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
const candidatesFrom = (riverName: string, slug: string) => {
  const base = [riverName, slug, slug.replace(/-/g, ' ')]
  const titled = base.map(titleCase)
  return Array.from(new Set([...base, ...titled]))
}

export async function getRiverGallerySimple(
  slug: string,
  totalLimit = 40,
): Promise<RiverGalleryImageDTO[]> {
  const payload = await getPayloadClient()

  // 1) river
  const river = (
    await payload.find({
      collection: 'rivers',
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    })
  ).docs?.[0] as any
  if (!river) return []

  // 2) events
  const evRes = await payload.find({
    collection: 'events',
    where: {
      river: { equals: river.id },
      eventType: { equals: 'trip' },
      status: { equals: 'published' },
    },
    depth: 1,
    limit: totalLimit,
    sort: '-startTime',
  })
  const fromEvents = evRes.docs
    ?.map((d: any) => toDTO(d?.featuredImage, `ev-${d.id}`, d?.title))
    .filter(Boolean) as RiverGalleryImageDTO[]

  // 3) gallery
  const candidates = candidatesFrom(river?.name ?? '', slug)
  let fromTag: RiverGalleryImageDTO[] = []
  for (const name of candidates) {
    const { gallery } = await getGalleryByTag(name, { limit: totalLimit })
    if (gallery?.length) {
      fromTag = (gallery as any[])
        .map((g, i) => toDTO(g?.image, `gal-${g.id}-${i}`, g?.image?.alt ?? ''))
        .filter(Boolean) as RiverGalleryImageDTO[]
      break
    }
  }

  // 4) river featured
  const fromRiver = river?.featuredImage
    ? [toDTO(river.featuredImage, `rv-${river.id}`, river.name)!]
    : []

  // 5) Merge
  return dedupeByUrl<RiverGalleryImageDTO>([
    ...fromEvents,
    ...fromTag,
    ...fromRiver,
  ]).slice(0, totalLimit)
}
