import { NextRequest, NextResponse } from 'next/server'

import { getGallery, getGalleryByTag } from '@/queries/gallery'

/** Largest page size a client may ask for. */
export const MAX_LIMIT = 48

function parsePositiveInt(value: string | null): number | null {
  if (value === null || value.trim() === '') {
    return null
  }
  if (!/^\d+$/.test(value.trim())) {
    return null
  }
  const number = Number(value)
  return number >= 1 ? number : null
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pageParam = searchParams.get('page')
  const tagParam = searchParams.get('tag')
  const limitParam = searchParams.get('limit')

  if (pageParam === null || limitParam === null) {
    return NextResponse.json(
      { error: 'Missing required query parameters: page and limit' },
      { status: 400 },
    )
  }

  const page = parsePositiveInt(pageParam)
  const limit = parsePositiveInt(limitParam)

  if (page === null || limit === null) {
    return NextResponse.json(
      { error: 'page and limit must be positive whole numbers' },
      { status: 400 },
    )
  }

  const tag = tagParam?.trim()
  const pageSize = Math.min(limit, MAX_LIMIT)

  try {
    const { gallery, hasNextPage } = tag
      ? await getGalleryByTag(tag, { page, limit: pageSize })
      : await getGallery({ page, limit: pageSize })

    return NextResponse.json({ images: gallery, hasMore: hasNextPage })
  } catch (error) {
    console.error('Failed to load gallery images:', error)
    return NextResponse.json(
      { error: 'Could not load gallery images' },
      { status: 500 },
    )
  }
}
