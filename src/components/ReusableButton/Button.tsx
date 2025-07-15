import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type buttonProps = {
  text: string
  href?: string
  onClick?: () => void
  size: string
  className?: string
}

const baseStyle = 'flex items-center justify-center text-center p-5 bg-white'

export default function Button({
  text,
  href,
  onClick,
  size,
  className,
}: buttonProps) {
  const classes = clsx(size, className, baseStyle)

  return <div className={classes}>{text}</div>
}
