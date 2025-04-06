import { fileURLToPath } from 'url'
import React from 'react'
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'

import config from '@/payload.config'

import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main className="home">
      <section className="content">
        <h1>
          {user
            ? `Welcome back, ${user.email}`
            : 'Welcome to your new project.'}
        </h1>

        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Admin Panel
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </footer>
    </main>
  )
}