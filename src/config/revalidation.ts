import { Event } from '@/payload-types'

export const cacheTags: Record<
  string, // Slug of collection
  string[] // Slug of other collections that the collection is related to
> = {
  events: ['media'],
  execs: ['media'],
  media: [],
  rivers: ['media'],
  'trip-reports': ['media'],
  users: [],
}

// Use dfs to find every tag that is related to the given tag
export function getRevalidationTags(tagName: string): string[] {
  const revalidationTags: string[] = []

  if (!(tagName in cacheTags)) {
    console.error('Invalid tag found when getting revalidation tags.')
    return []
  }
  const seen = new Set([tagName])
  const stack: string[] = [tagName]

  while (stack.length > 0) {
    const newTag = stack.pop() as string
    revalidationTags.push(newTag)

    cacheTags[newTag].forEach((element) => {
      if (!(element in cacheTags)) {
        console.error('Invalid tag found when getting revalidation tags.')
      } else if (!seen.has(element)) {
        seen.add(element)
        stack.push(element)
      }
    })
  }

  return revalidationTags
}
