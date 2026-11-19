import React from 'react'

import './styles.css'

import { FontVariables } from '@/components/FontVariables'
import { Footer } from './_components/layout/Footer'
import { Navbar } from './_components/layout/Navbar'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function FrontendLayout(props: {
  children: React.ReactNode
}) {
  const { children } = props

  // The public site and the Payload admin are separate root layouts, so each
  // renders its own <html> and <body>.
  return (
    <html lang="en">
      <body>
        <FontVariables />
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
