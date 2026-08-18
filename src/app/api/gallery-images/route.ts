import { NextRequest, NextResponse } from 'next/server'

import { getGallery, getGalleryByTag } from '@/queries/gallery'

function parsePositiveInt(value: string | null): number | null {
  if (value === null || value.trim() === '') {
    return null
  }
  if (!/^\d+$/.test(value.trim())) {
    return null
  }
  return Number(value)
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
      { error: 'page and limit must be numeric' },
      { status: 400 },
    )
  }

  const tag = tagParam?.trim()

  const { gallery, hasNextPage } = tag
    ? await getGalleryByTag(tag, { page, limit })
    : await getGallery({ page, limit })

  return NextResponse.json({ images: gallery, hasMore: hasNextPage })
}
