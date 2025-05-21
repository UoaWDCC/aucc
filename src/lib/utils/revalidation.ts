import { revalidateTag } from 'next/cache'

type CacheTag = keyof typeof tagRelations

const tagRelations = {
  events: ['media'],
  execs: ['media'],
  media: [],
  rivers: ['media'],
  tripReports: ['media'],
} as const

export const cacheTags: Record<
  CacheTag,
  {
    relatedTags: CacheTag[]
    revalidate: () => void
  }
> = {
  events: {
    relatedTags: getRevalidationTags('events'),
    revalidate: () => revalidateTag('events'),
  },
  execs: {
    relatedTags: getRevalidationTags('execs'),
    revalidate: () => revalidateTag('execs'),
  },
  media: {
    relatedTags: getRevalidationTags('media'),
    revalidate: () => revalidateTag('media'),
  },
  rivers: {
    relatedTags: getRevalidationTags('rivers'),
    revalidate: () => revalidateTag('rivers'),
  },
  tripReports: {
    relatedTags: getRevalidationTags('tripReports'),
    revalidate: () => revalidateTag('tripReports'),
  },
}

/**
 * Use dfs to find every tag that is related to the given tag
 @param tagName - The tag for the collection to get revalidation tags for
 @param relations - The record of relationships between collections
 @returns - List of tags that is related to given tag
 **/
export function getRevalidationTags(
  tagName: CacheTag,
  relations: Record<CacheTag, readonly CacheTag[]> = tagRelations,
): CacheTag[] {
  const revalidationTags: CacheTag[] = []
  const seen = new Set([tagName])
  const stack: CacheTag[] = [tagName]

  while (stack.length > 0) {
    const newTag = stack.pop()

    if (!newTag) {
      break
    }

    revalidationTags.push(newTag)

    relations[newTag].forEach((element) => {
      if (!seen.has(element)) {
        seen.add(element)
        stack.push(element)
      }
    })
  }

  return revalidationTags
}
