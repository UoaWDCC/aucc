import NotFoundComponent from '@/components/NotFound'

export default function NotFound() {
  return (
    <div>
      <NotFoundComponent
        title="River"
        href="/rivers"
        subtitle="The river you are looking for does not exist."
        buttonText="Return to Rivers"
      />
    </div>
  )
}
