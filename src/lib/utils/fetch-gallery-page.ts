import type { GalleryDTO } from '@/queries/gallery'

export const GALLERY_PAGE_LIMIT = 12

export type GalleryImage = { src: string; alt: string }

export async function fetchGalleryPage(
  page: number,
  tag: string | null,
  signal?: AbortSignal,
): Promise<{ images: GalleryImage[]; hasMore: boolean }> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(GALLERY_PAGE_LIMIT),
  })
  if (tag) params.set('tag', tag)

  const res = await fetch(`/api/gallery?${params.toString()}`, { signal })

  if (!res.ok) throw new Error('Failed to load gallery')

  const data: { images: GalleryDTO[]; hasMore: boolean } = await res.json()

  return {
    images: data.images.map((doc) => ({
      src: doc.image?.url ?? '',
      alt: doc.image?.alt ?? '',
    })),
    hasMore: data.hasMore,
  }
}
