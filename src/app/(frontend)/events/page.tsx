import { fileURLToPath } from 'url'

export default async function EventsPage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="footer">
        <h1>Welcome to the events page.</h1>
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/events/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
