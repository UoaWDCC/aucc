'use client'

import ErrorMessage from '@/components/ErrorMessage'

import './(frontend)/styles.css'

// Catches errors thrown by the root layout itself, which replaces the whole
// document, so it must render its own <html> and <body>.
export default function GlobalError(props: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <ErrorMessage {...props} />
      </body>
    </html>
  )
}
