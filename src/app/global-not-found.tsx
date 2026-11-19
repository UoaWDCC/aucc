import type { Metadata } from 'next'

import { FontVariables } from '@/components/FontVariables'
import NotFoundComponent from '@/components/NotFound'

import './(frontend)/styles.css'

// Shown for URLs that match no route. There's no app-wide root layout (the
// public site and the Payload admin each have their own), so this renders the
// whole document. Pages that call notFound() use (frontend)/not-found.tsx.
export const metadata: Metadata = {
  title: 'Page not found | AUCC',
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <FontVariables />
        <NotFoundComponent title="Page" href="/" buttonText="Return to Home" />
      </body>
    </html>
  )
}
