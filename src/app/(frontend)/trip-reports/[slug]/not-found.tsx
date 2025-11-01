import NotFoundComponent from '@/components/NotFound'

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
