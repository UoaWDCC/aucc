import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Navbar } from './Navbar'

export function Header() {
  return (
    <header className="flex w-full items-center justify-between p-8">
      <Link href="/">
        <h1 className="flex items-center text-2xl font-bold">AUCC</h1>
        {/* <Image
          src="/images/logo.png"
          width={100}
          height={100}
          alt="AUCC logo"
        /> */}
      </Link>
      <Navbar />
    </header>
  )
}
