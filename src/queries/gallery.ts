import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'
import { cacheTags } from '@/lib/utils/revalidation'
import { NoNumber } from '@/lib/utils/util-types'
import { Gallery } from '@/payload-types'

export type GalleryDTO = NoNumber<Gallery>

// Only swallow "schema not ready" errors in CI/build (fresh DB).
function isSchemaMissing(err: unknown) {
  const e = err as any
  const msg = String(e?.message ?? e)
  const code = e?.code
  // Postgres error codes:
  // 42P01: undefined_table, 42703: undefined_column
  return (
    msg.includes('does not exist') ||
    msg.includes('gallery__rels') ||
    code === '42P01' ||
    code === '42703'
  )
}

/**
 * NOTE(aucc):
 * - 빌드 프리렌더에서 gallery의 hasMany 업로드(`images`)가 암묵 조인테이블(gallery__rels.*)을 건드려
 *   CI 초기 DB에선 스키마가 없어 폭발할 수 있다.
 * - 홈에선 대표 단일 이미지(`image`)와 태그만 필요하므로 `select`로 `images`를 제외.
 * - 그래도 어댑터 경로에 따라 조인 접근이 시도될 수 있어, "스키마 없음" 에러는
 *   CI/빌드에서만 빈 결과로 폴백해 빌드를 통과시킨다. 런타임에서는 정상 DB에서 그대로 동작.
 */

/**
 * Get all gallery items
 */
export const getGallery = unstable_cache(
  async function ({
    page = 1,
    limit = 10,
    sort = '-createdAt',
  }: {
    page?: number
    limit?: number
    sort?: string
  } = {}): Promise<{
    gallery: GalleryDTO[]
    hasNextPage: boolean
    nextPage: number | null
    totalDocs: number
  }> {
    const payload = await getPayloadClient()

    try {
      const res = await payload.find({
        collection: 'gallery',
        page,
        limit,
        sort,
        depth: 1, // 단일 upload(image)/tags 해석용
        // hasMany 업로드(images)는 제외 → 조인테이블 접근 최소화
        select: {
          id: true,
          createdAt: true,
          image: true,
          tags: true,
          // images 미포함
        },
      })

      const { docs, hasNextPage, nextPage, totalDocs } = res

      return {
        gallery: docs as GalleryDTO[],
        hasNextPage: !!hasNextPage,
        nextPage: nextPage ?? null,
        totalDocs: totalDocs ?? 0,
      }
    } catch (err) {
      if (
        (process.env.CI || process.env.NODE_ENV === 'production') &&
        isSchemaMissing(err)
      ) {
        // CI 초기 DB: 스키마가 아직 없으면 빈 결과로 프리렌더를 살린다.
        return { gallery: [], hasNextPage: false, nextPage: null, totalDocs: 0 }
      }
      throw err
    }
  },
  ['getGallery'],
  {
    tags: cacheTags.gallery.relatedTags,
  },
)

/**
 * Get gallery items by tag name
 */
export const getGalleryByTag = unstable_cache(
  async function (
    tagName: string,
    {
      page = 1,
      limit = 10,
      sort = '-createdAt',
    }: {
      page?: number
      limit?: number
      sort?: string
    } = {},
  ): Promise<{
    gallery: GalleryDTO[]
    hasNextPage: boolean
    nextPage: number | null
    totalDocs: number
  }> {
    const payload = await getPayloadClient()

    try {
      const res = await payload.find({
        collection: 'gallery',
        where: {
          'tags.name': { equals: tagName },
        },
        page,
        limit,
        sort,
        depth: 1,
        select: {
          id: true,
          createdAt: true,
          image: true,
          tags: true,
          // images 미포함
        },
      })

      const { docs, hasNextPage, nextPage, totalDocs } = res

      return {
        gallery: docs as GalleryDTO[],
        hasNextPage: !!hasNextPage,
        nextPage: nextPage ?? null,
        totalDocs: totalDocs ?? 0,
      }
    } catch (err) {
      if (
        (process.env.CI || process.env.NODE_ENV === 'production') &&
        isSchemaMissing(err)
      ) {
        return { gallery: [], hasNextPage: false, nextPage: null, totalDocs: 0 }
      }
      throw err
    }
  },
  ['getGalleryByTag'],
  {
    tags: cacheTags.gallery.relatedTags,
  },
)
