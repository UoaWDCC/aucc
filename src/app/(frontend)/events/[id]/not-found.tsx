import Link from 'next/link'

import NotFoundComponent from '@/components/NotFound/index.tsx'

export default function NotFound() {
  return (
    <div>
      <NotFoundComponent
        title="Event"
        subtitle="The event you are looking for does not exist."
        href="/events"
        buttonText="Return to Events"
      />
    </div>
  )
}
