'use client'

import ErrorMessage from '@/components/ErrorMessage'

export default function Error(props: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorMessage {...props} href="/events" linkText="Return to Events" />
}
