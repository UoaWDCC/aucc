import { fileURLToPath } from 'url'

export default async function MerchPage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="footer">
        <h1>Welcome to the merch page.</h1>
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/merch/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
