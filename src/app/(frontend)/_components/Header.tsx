import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Navbar from './Navbar'

export default function Header() {
  return (
    <header className="flex w-full justify-center gap-16 pt-8">
      <Link href="/">
        <Image src="" width={100} height={100} alt="AUCC logo"></Image>
      </Link>
      <Navbar />
    </header>
  )
}
