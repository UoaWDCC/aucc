import { getTags } from '@/queries/tags'
import { PaginatedGallery } from './PaginatedGallery'

export async function GallerySubheading() {
  const tags = await getTags()

  return (
    <div className="min-h-screen bg-[#89ACAD] py-40">
      <div className="mx-auto max-w-6xl px-15">
        <h1
          className="font-heading mb-16 tracking-widest text-white uppercase"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}
        >
          Gallery
        </h1>
        <PaginatedGallery tags={tags.map((tag) => tag.name)} />
      </div>
    </div>
  )
}
