import { buildPageMetadata, headerImageOf } from '@/lib/page-metadata'
import { getRivers } from '@/queries/rivers'
import { getRiversGlobal } from '@/queries/rivers-global'
import { RiversPage } from './_components/RiversPage'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Rivers',
    description: 'The rivers AUCC paddles, with grades, put-ins and take-outs.',
    path: '/rivers',
    image: await headerImageOf(getRiversGlobal),
  })
}

export default async function Page() {
  try {
    const { headerImage, introText } = await getRiversGlobal()
    const { rivers } = await getRivers({ page: 1, limit: 10 })

    return (
      <RiversPage
        headerImage={headerImage}
        introText={introText}
        rivers={rivers}
      />
    )
  } catch (error) {
    console.error('Error loading rivers data:', error)
    // Return a fallback component or redirect
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Rivers Page</h1>
          <p>Unable to load rivers data. Please try again later.</p>
        </div>
      </div>
    )
  }
}
