import type { GalleryDTO } from '@/queries/river-gallery'

function hashSeed(s: string) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < s.length; i++)
    h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}
function pickAspect(id: string, idx: number) {
  const pool = [
    [1, 1], // 1:1
    [3, 4], // 3:4
    [4, 5], // 4:5
    [4, 3], // 4:3
    [16, 9], // 16:9
    [5, 4], // 5:4
  ] as const
  return pool[hashSeed(`${id}:${idx}`) % pool.length]
}

type Rounded = 'none' | 'sm' | 'md'

export function RiverGalleryGrid({
  items,
  rounded = 'sm',
  colHeights = [62, 54, 66, 58],
}: {
  items: GalleryDTO[]
  rounded?: Rounded
  colHeights?: number[]
}) {
  if (!items?.length) return null

  const base = items.length
  const displayCount = Math.max(8, Math.min(base * 3, 12))
  const repeated = Array.from(
    { length: displayCount },
    (_, i) => items[i % base],
  )

  const portrait: GalleryDTO[] = []
  const landscape: GalleryDTO[] = []
  repeated.forEach((it) => {
    const img = it.image as { width?: number; height?: number }
    const ar = img?.width && img?.height ? img.height / img.width : 1.2
    ;(ar > 1 ? portrait : landscape).push(it)
  })
  const mixed = [
    ...portrait.sort(() => Math.random() - 0.5),
    ...landscape.sort(() => Math.random() - 0.5),
  ]

  const COLS = 4
  const columns: GalleryDTO[][] = Array.from({ length: COLS }, () => [])
  mixed.forEach((it, idx) => columns[idx % COLS].push(it))

  const roundedClass =
    rounded === 'none'
      ? 'rounded-none'
      : rounded === 'md'
        ? 'rounded-md'
        : 'rounded'

  return (
    <div className="grid grid-cols-2 gap-3 p-4 lg:grid-cols-4">
      {columns.map((col, i) => {
        const h = colHeights[i] ?? colHeights[colHeights.length - 1] ?? 60
        return (
          <div
            key={i}
            className={`${i >= 2 ? 'hidden lg:flex' : 'flex'} flex-col justify-end gap-3`}
            style={{ height: `${h}vh` }}
          >
            {col.map((item, idx) => {
              const img = (item as any)?.image as {
                url?: string
                alt?: string
                width?: number
                height?: number
              }
              if (!img?.url) return null
              const [w, h] = pickAspect(String(item.id), idx)
              return (
                <figure
                  key={`${item.id}-${idx}`}
                  className={`overflow-hidden ${roundedClass}`}
                  style={{ aspectRatio: `${w} / ${h}` }}
                >
                  <img
                    src={img.url}
                    alt={img.alt || `Gallery image ${idx + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
