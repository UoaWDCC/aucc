import Link from 'next/link'

import NotFoundComponent from '@/components/NotFound/index.tsx'

export default function NotFound() {
  return (
    <>
      <NotFoundComponent
        title="Trip Report"
        subtitle="The trip report you are looking for does not exist."
        href="/trip-reports"
        buttonText="Return to Trip Reports"
      />
    </>
  )
}
