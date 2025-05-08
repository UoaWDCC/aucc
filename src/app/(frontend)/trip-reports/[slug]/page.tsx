export default async function SpecificTripReportPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div>
      <div>
        <h1>
          Welcome to the specific trip report page, current trip is {slug}
        </h1>
        <p>Update this page by editing</p>
        <a>
          <code>app/(frontend)/trips/[slugs]/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
