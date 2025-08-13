import { getGallery } from '@/queries/gallery'

export async function EventGalleryGrid() {
  const { gallery: allGallery } = await getGallery({ limit: 50 })

  const gallery = allGallery.filter((item) =>
    item.tags?.some(
      (tag) => typeof tag === 'object' && tag?.name === 'Fulljames',
    ),
  )

  type GalleryItem = (typeof gallery)[0]

  const repeatedGallery = [...Array(8)].map(
    (_, i) => gallery[i % gallery.length],
  )

  const shuffledGallery = [...repeatedGallery].sort(() => Math.random() - 0.5)

  const columns: GalleryItem[][] = [[], [], [], []]

  shuffledGallery.forEach((item, idx) => {
    columns[idx % 4].push(item)
  })

  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {columns.map((col, idx) => (
        <div
          key={idx}
          className={`flex flex-col gap-2 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
          {col.map((item, i) => (
            <img
              key={`${item.id}-${idx}-${i}`}
              src={item.image.url ?? ''}
              alt=""
              className="h-auto w-full object-cover"
            />
          ))}
        </div>
      ))}
    </div>
  )
}
