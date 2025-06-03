import React from 'react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex w-full justify-center bg-black text-white">
      <div>&copy; AUCC {currentYear}</div>
    </footer>
  )
}
