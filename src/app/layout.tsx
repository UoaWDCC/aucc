import React from 'react'

import { fontVariablesCss } from './fonts'

import './(frontend)/styles.css'

export const metadata = {
  description: 'Auckland University Canoe Club',
  title: 'AUCC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* href + precedence make React hoist this into <head> */}
        <style href="aucc-font-variables" precedence="default">
          {fontVariablesCss}
        </style>
        {children}
      </body>
    </html>
  )
}
