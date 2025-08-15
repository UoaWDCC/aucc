import { getGalleryByTag } from '@/queries/gallery'

interface EventGalleryGridProps {
  tagName: string
}

export async function EventGalleryGrid({ tagName }: EventGalleryGridProps) {
  const { gallery } = await getGalleryByTag(tagName, {
    limit: 8,
  })

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
    <div className="grid grid-cols-2 gap-2 p-4 lg:grid-cols-4">
      {columns.map((col, idx) => (
        <div
          key={idx}
          className={`${idx >= 4 ? 'hidden lg:flex' : 'flex'} flex-col gap-2 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
          {col.map((item, i) => (
            <img
              key={`${item.id}-${idx}-${i}`}
              src={item.image.url ?? ''}
              alt=""
              className={`h-auto w-full object-cover ${i >= 3 ? 'hidden lg:block' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
