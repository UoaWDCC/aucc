import { revalidateTag } from 'next/cache'

/**
 @typedef CacheTag Custom type definined by keys of tagRelatinos
 */
export type CacheTag = keyof typeof tagRelations

/** 
 * Dictionary representing the relationship between collections
 * 
 * Update when adding new collections or new relationships are added
 * 
 * Key - The tag for collection
 * 
 * Value - List of tags for collections that it is relatedTo
 * 
 @constant
 @type {readonly CacheTag: readonly CacheTag[]}
 */
const tagRelations = {
  events: ['media'],
  execs: ['media'],
  media: [],
  rivers: ['media'],
  tripReports: ['media'],
  gallery: ['media'],
} as const

/** 
 * Dictionary of cacheTags with list of related tags and funciton to revalidate tag
 * 
 * Key - The CacheTags for the collection
 * 
 * Value - Object containing list of related CacheTags and function to revalidate collection
 * 
 * Update when adding new collections or new relationships are added
 @constant
 @type {CacheTag: {CacheTag, { relatedTags, revalidate }}}
 @property { CacheTag[] } relatedTags - All CacheTags related to collection
 @property { (CacheTag) => Void} revalidate - Function to revalidate collection
 */
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
  gallery: {
    relatedTags: getRevalidationTags('gallery'),
    revalidate: () => revalidateTag('gallery'),
  },
}

/**
 * Use dfs to find every tag that is related to the given tag
 * 
 * Dfs is used to ensure are tags that are indirectly related to the given tag
 * are also found and included
 * 
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
