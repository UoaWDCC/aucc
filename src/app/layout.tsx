import React from 'react'

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
  return children
}
