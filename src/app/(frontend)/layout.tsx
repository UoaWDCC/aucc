import React from 'react'

import './styles.css'

import Footer from './_components/Footer'
import Header from './_components/Header'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      {/* Can remove the min-h-dvh when theres content on the page*/}
      <body className="min-h-dvh">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
