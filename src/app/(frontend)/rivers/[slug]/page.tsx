import { notFound } from 'next/navigation'

import { getRiverBySlug } from '@/queries/rivers'
import { RiverPage } from './_component/RiverPage'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const river = await getRiverBySlug(slug)

  if (!river) {
    notFound()
  }

  return <RiverPage river={river} />
}
