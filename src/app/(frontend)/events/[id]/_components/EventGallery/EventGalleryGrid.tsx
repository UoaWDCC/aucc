import { GalleryDTO, getGalleryByTag } from '@/queries/gallery'

interface EventGalleryGridProps {
  tagName: string
}

export async function EventGalleryGrid({ tagName }: EventGalleryGridProps) {
  const { gallery } = await getGalleryByTag(tagName, { limit: 10 })

  if (gallery.length === 0) {
    return null
  }

  // Create shuffled array, repeating items if necessary to fill display
  const displayCount = Math.min(gallery.length * 2, 10)
  const repeatedGallery = [...Array(displayCount)].map(
    (_, i) => gallery[i % gallery.length],
  )

  // Separate into portrait and landscape, randomize each group
  const portraitImages: GalleryDTO[] = []
  const landscapeImages: GalleryDTO[] = []

  repeatedGallery.forEach((item) => {
    const image = item.image as { width?: number; height?: number }
    const aspectRatio =
      image?.width && image?.height ? image.height / image.width : 1.2 // Default to portrait if no dimensions

    if (aspectRatio > 1) {
      portraitImages.push(item)
    } else {
      landscapeImages.push(item)
    }
  })

  // Shuffle each group separately
  const shuffledPortrait = [...portraitImages].sort(() => Math.random() - 0.5)
  const shuffledLandscape = [...landscapeImages].sort(() => Math.random() - 0.5)

  // Combine with portraits first
  const orderedGallery = [...shuffledPortrait, ...shuffledLandscape]

  const columns: GalleryDTO[][] = [[], [], [], []]

  orderedGallery.forEach((item, idx) => {
    columns[idx % 4].push(item)
  })

  columns.sort(() => Math.random() - 0.5)
  columns.forEach((col) => {
    if (Math.random() > 0.5) col.reverse()
  })

  return (
    <div className="grid grid-cols-2 gap-2 p-4 lg:grid-cols-4">
      {columns.map((col, idx) => (
        <div
          key={idx}
          className={`${idx >= 2 ? 'hidden lg:flex' : 'flex'} flex-col gap-2 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
          {col.map((item, i) => {
            const image = item.image as { url: string; alt?: string }
            return (
              <img
                key={`${item.id}-${idx}-${i}`}
                src={image.url}
                alt={image.alt || `Gallery image ${i + 1}`}
                className={`h-auto w-full object-cover ${i >= 2 ? 'hidden lg:block' : ''}`}
                loading="lazy"
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
