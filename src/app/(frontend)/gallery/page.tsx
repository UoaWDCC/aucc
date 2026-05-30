import { getGalleryGlobal } from '@/queries/gallery-global'
import { GalleryPage } from './_components/GalleryPage'

export default async function Page() {
  try {
    const { headerImage } = await getGalleryGlobal()

    if (!headerImage) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Gallery Page</h1>
            <p>
              Gallery content is not configured yet. Please check back later.
            </p>
          </div>
        </div>
      )
    }

    return <GalleryPage headerImage={headerImage} />
  } catch (error) {
    console.error('Error loading gallery page:', error)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Something went wrong. Please try again later.</p>
      </div>
    )
  }
}
