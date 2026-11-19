import { buildPageMetadata, headerImageOf } from '@/lib/page-metadata'
import { getResourcesGlobal } from '@/queries/resources-global'

// Metadata lives in this layout, not page.tsx, so it doesn't conflict with
// the open resources PR that rewrites the page.
export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Resources',
    description:
      'Guides, policies and useful links for AUCC members, from learning to roll to organising a trip.',
    path: '/resources',
    image: await headerImageOf(getResourcesGlobal),
  })
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
