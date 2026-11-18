import React from 'react'
import type { Metadata } from 'next'

import './styles.css'

import { env } from '@/lib/env'
import { SITE_NAME, SITE_SHORT_NAME } from '@/lib/metadata'
import { buildPageMetadata } from '@/lib/page-metadata'
import { Footer } from './_components/layout/Footer'
import { Navbar } from './_components/layout/Navbar'

export async function generateMetadata(): Promise<Metadata> {
  return {
    // Defaults for every page; no path, so no shared canonical URL
    ...(await buildPageMetadata({})),
    // Makes relative image and canonical URLs absolute
    metadataBase: new URL(env.SERVER_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_SHORT_NAME}`,
    },
    applicationName: SITE_NAME,
  }
}

export default async function FrontendLayout(props: {
  children: React.ReactNode
}) {
  const { children } = props

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
