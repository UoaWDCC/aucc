import { buildPageMetadata } from '@/lib/page-metadata'
import { HomePage } from './home/_components/HomePage'

export async function generateMetadata() {
  // No title: the home page uses the full club name
  return buildPageMetadata({ path: '/' })
}

export default async function Page() {
  return <HomePage />
}
