import { notFound } from 'next/navigation'

import { mediaUrl } from '@/lib/metadata'
import { buildPageMetadata } from '@/lib/page-metadata'
import { getRiverBySlug } from '@/queries/rivers'
import { RiverPage } from './_component/RiverPage'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { slug: rawSlug } = await params
  const river = await getRiverBySlug(decodeURIComponent(rawSlug))

  if (!river) return { title: 'River not found' }

  return buildPageMetadata({
    title: river.name,
    description:
      river.description ||
      `${river.name}: a grade ${river.grade} river paddled by AUCC${river.location ? `, near ${river.location}` : ''}.`,
    path: `/rivers/${encodeURIComponent(river.slug ?? rawSlug)}`,
    image: mediaUrl(river.featuredImage),
  })
}

export default async function Page({ params }: PageProps) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const river = await getRiverBySlug(slug)

  if (!river) {
    return notFound()
  }

  return <RiverPage river={river} />
}
