import { fileURLToPath } from 'url'
import React, { Suspense } from 'react'
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'

import { RecentContent } from '@/components/RecentContent'
import config from '@/payload.config'

import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <h1>Welcome to AUCC</h1>

        <Suspense fallback={<p>Loading content...</p>}>
          <RecentContent />
        </Suspense>

        <div className="footer">
          <p>Update this page by editing</p>
          <a className="codeLink" href={fileURL}>
            <code>app/(frontend)/page.tsx</code>
          </a>
        </div>
      </div>
    </div>
  )
}
