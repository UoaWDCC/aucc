import type { Metadata } from 'next'

import { getExecs } from '@/queries/execs'
import { getSiteSettings } from '@/queries/site-settings'
import { AboutPage } from './_components/AboutPage'

export const metadata: Metadata = {
  title: 'About Us - Auckland University Canoe Club',
  description:
    "Learn about AUCC's history, mission, and meet our executive team. Join New Zealand's premier university canoe club.",
  openGraph: {
    title: 'About Us - AUCC',
    description:
      "Learn about AUCC's history, mission, and meet our executive team.",
    type: 'website',
  },
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
