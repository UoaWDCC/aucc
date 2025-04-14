import { fileURLToPath } from 'url'
import React from 'react'
import Image from 'next/image'

import '../../styles.css'

export default async function SpecificEventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`
  const { slug } = await params

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        <h1>Welcome to the specific event page, current event is {slug}</h1>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/events/[slugs]/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
