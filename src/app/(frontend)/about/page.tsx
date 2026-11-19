import { buildPageMetadata } from '@/lib/page-metadata'
import { getExecs } from '@/queries/execs'
import { getSiteSettings } from '@/queries/site-settings'
import { AboutPage } from './_components/AboutPage'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'About Us',
    description:
      "Learn about AUCC's history, get in touch, and meet our executive team.",
    path: '/about',
  })
}

async function getExecsOrEmpty() {
  try {
    const { execs } = await getExecs()
    return execs ?? []
  } catch (error) {
    // Show the rest of the page; the execs grid has its own empty state
    console.error('Failed to load executives:', error)
    return []
  }
}

export default async function Page() {
  const [execs, settings] = await Promise.all([
    getExecsOrEmpty(),
    getSiteSettings(),
  ])

  return <AboutPage execs={execs} settings={settings} />
}
