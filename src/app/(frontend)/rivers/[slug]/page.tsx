import { notFound } from 'next/navigation'

import { getRiverBySlug } from '@/queries/rivers'
import { RiverPage } from './_component/RiverPage'

type PageProps = { params: Promise<{ slug: string }> }

export default async function Page({ params }: PageProps) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const river = await getRiverBySlug(slug)

  if (!river) {
    return notFound()
  }

  return <RiverPage river={river} />
}
