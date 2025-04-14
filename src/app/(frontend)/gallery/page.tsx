import { fileURLToPath } from 'url'

export default async function GalleryPage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="footer">
        <h1>Welcome to the gallery page.</h1>
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/gallery/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
