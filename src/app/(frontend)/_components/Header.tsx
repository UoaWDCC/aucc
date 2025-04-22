import React from 'react'
import Link from 'next/link'

import Navbar from './Navbar'

export default function Header() {
  return (
    <div className="flex w-full justify-center gap-16 pt-8">
      <Link href="/">
        <img alt="AUCC logo" />
      </Link>
      <Navbar />
    </div>
  )
}
