import { fileURLToPath } from 'url'

export default async function GearHirePage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="footer">
        <h1>Welcome to the gear hire page.</h1>
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/gear/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
