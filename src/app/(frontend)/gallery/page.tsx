import { getGalleryGlobal } from '@/queries/gallery-global'
import { GalleryPage } from './_components/GalleryPage'

export default async function Page() {
  try {
    const { headerImage } = await getGalleryGlobal()

    return <GalleryPage headerImage={headerImage} />
  } catch (error) {
    console.error('Error loading gallery page:', error)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Gallery Page</h1>
          <p>Unable to load gallery data. Please try again later.</p>
        </div>
      </div>
    )
  }
}
