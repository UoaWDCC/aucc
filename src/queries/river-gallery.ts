import { getPayloadClient } from '@/lib/payload'
import { getGalleryByTag } from '@/queries/gallery'

export type GalleryDTO = {
  id: string
  image: { url: string; alt?: string; width?: number; height?: number }
}

const toDTO = (u: any, id: string, alt = ''): GalleryDTO | null =>
  u?.url
    ? {
        id,
        image: {
          url: u.url,
          alt: u.alt ?? alt,
          width: u.width,
          height: u.height,
        },
      }
    : null

const dedupeByUrl = <T extends { image: { url: string } }>(arr: T[]) =>
  Array.from(new Map(arr.map((i) => [i.image.url, i])).values())

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
): Promise<GalleryDTO[]> {
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
    .filter(Boolean) as GalleryDTO[]

  // 3) gallery
  const candidates = candidatesFrom(river?.name ?? '', slug)
  let fromTag: GalleryDTO[] = []
  for (const name of candidates) {
    const { gallery } = await getGalleryByTag(name, { limit: totalLimit })
    if (gallery?.length) {
      fromTag = (gallery as any[])
        .map((g, i) => toDTO(g?.image, `gal-${g.id}-${i}`, g?.image?.alt ?? ''))
        .filter(Boolean) as GalleryDTO[]
      break
    }
  }

  // 4) river featured
  const fromRiver = river?.featuredImage
    ? [toDTO(river.featuredImage, `rv-${river.id}`, river.name)!]
    : []

  // 5) Merge
  return dedupeByUrl<GalleryDTO>([
    ...fromEvents,
    ...fromTag,
    ...fromRiver,
  ]).slice(0, totalLimit)
}
