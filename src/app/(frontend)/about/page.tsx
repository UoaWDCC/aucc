import type { Metadata } from 'next'

import { getExecs } from '@/queries/execs'
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

export default async function Page() {
  try {
    const { execs } = await getExecs()

    if (!execs || execs.length === 0) {
      return <div>No executives found.</div>
    }

    return <AboutPage execs={execs} />
  } catch (error) {
    console.error('Failed to load executives:', error)
    return <div>Failed to load page. Please try again later.</div>
  }
}
