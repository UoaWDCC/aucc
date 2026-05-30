import { GALLERY_IMAGES } from './GalleryData'
import { GalleryGrid } from './GalleryGrid'
import { NoImages } from './GalleryImage'

export function GallerySubheading() {
  return (
    <div className="min-h-screen bg-[#89ACAD] py-40">
      <div className="mx-auto max-w-6xl px-15">
        <h1
          className="font-heading mb-16 tracking-widest text-white uppercase"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}
        >
          Gallery
        </h1>
        {GALLERY_IMAGES.length > 0 ? (
          <GalleryGrid images={GALLERY_IMAGES} />
        ) : (
          <NoImages />
        )}
      </div>
    </div>
  )
}
