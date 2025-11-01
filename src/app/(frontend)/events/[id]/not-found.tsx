import NotFoundComponent from '@/components/NotFound'

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
