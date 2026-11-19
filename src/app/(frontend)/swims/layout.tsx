import { buildPageMetadata } from '@/lib/page-metadata'

// Metadata lives in this layout, not page.tsx, so it doesn't conflict with
// the open swims PR that rewrites the page.
export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Swims',
    description:
      'Took a swim on an AUCC trip? Log it here and see photos from the club.',
    path: '/swims',
  })
}

export default function SwimsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
