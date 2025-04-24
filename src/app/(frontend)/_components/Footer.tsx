import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex w-full justify-center bg-black text-white">
      <div>© AUCC {currentYear}</div>
    </footer>
  )
}
