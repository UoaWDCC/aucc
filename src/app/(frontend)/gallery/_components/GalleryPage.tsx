import { GalleryHeaderSection } from './header/GalleryHeaderSection'
import { GallerySpotlightSection } from './gallery-spotlight/GallerySpotlightSection'
import { VideoHighlightSection } from './video-highlights/VideoHighlightSection'
import { GalleryGrid } from './grid/GalleryGrid'

const GALLERY_IMAGES = [
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 1' },
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 2' },
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 3' },
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 4' },
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 5' },
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 6' },
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 7' },
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 8' },
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 9' },
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 10' },
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 11' },
  { src: 'https://placehold.co/400x400', alt: 'Gallery image 12' },
]

export function GalleryPage() {
  return (
    <>
      <GalleryHeaderSection />
      <GallerySpotlightSection />
      <VideoHighlightSection />
      <div className="min-h-screen py-40">
        <div className="mx-auto max-w-6xl px-15">
          <h1
            className="font-heading mb-16 tracking-widest text-white uppercase"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}
          >
            Full Gallery
          </h1>
          <GalleryGrid images={GALLERY_IMAGES} />
        </div>
      </div>
    </>
  )
}