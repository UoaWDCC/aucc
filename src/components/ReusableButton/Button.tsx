import { kMaxLength } from 'buffer'
import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type buttonProps = {
  text: string
  link?: string
  onClick?: () => void
  size: string
  className?: string
  variant?: 'cream' | 'algae' | 'default'
}

const baseStyle = 'flex items-center justify-center text-center'

const variantStyles: Record<NonNullable<buttonProps['variant']>, string> = {
  cream:
    'text-cream border-cream bg-transparent cursor-pointer rounded-4xl border-2 italic shadow-lg transition hover:bg-black/15',
  algae: 'text-algae cursor-pointer rounded-3xl border-2 text-xs',
  default: 'text-cream cursor-pointer bg-transparent border-2 rounded-4xl',
}

export default function Button({
  text,
  link,
  onClick,
  size,
  className,
  variant,
}: buttonProps) {
  const href = { link },
    classes = clsx(
      size,
      className,
      baseStyle,
      variantStyles[variant ?? 'default'],
    )

  if (link) {
    return (
      <Link href={link} className={classes}>
        {text}
      </Link>
    )
  }

  return (
    <div className={classes} onClick={onClick}>
      {text}
    </div>
  )
}
