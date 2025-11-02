import React from 'react'

import './(frontend)/styles.css'

export const metadata = {
  description: 'Auckland University Canoe Club',
  title: 'AUCC',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
