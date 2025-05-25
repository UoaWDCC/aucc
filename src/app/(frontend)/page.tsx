import { fileURLToPath } from 'url'
import React, { Suspense } from 'react'
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'

import { RecentContent } from '@/components/RecentContent'
import config from '@/payload.config'

import './styles.css'

function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate h-screen w-screen border-2 border-red-500">
      <div className="absolute top-0 -z-1 h-1/2 w-full bg-green-500" />
      <div className="absolute bottom-0 -z-1 h-1/2 w-full bg-blue-500" />
      {children}
    </div>
  )
}

function Section() {
  return (
    <section className="flex h-full w-full">
      <div className="h-full w-[300px]">pictures</div>
      <div className="h-full flex-grow bg-black/20">text</div>
    </section>
  )
}

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div>
      <Background>
        <Section />
      </Background>
    </div>
  )
}
