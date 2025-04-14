import { fileURLToPath } from 'url'

export default async function SpecificEventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`
  const { slug } = await params

  return (
    <div className="home">
      <div className="footer">
        <h1>Welcome to the specific event page, current event is {slug}</h1>
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/events/[slugs]/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
