import React, { Children } from 'react'
import Link from 'next/link'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/cn'

const buttonVariants = cva('flex items-center justify-center text-center', {
  variants: {
    intent: {
      primary: ['text-algae', 'cursor-pointer', 'border-2', 'rounded-4xl'], // Default styled button
      secondary: [
        'text-cream',
        'border-cream',
        'bg-transparent',
        'border-2',
        'cursor-pointer',
        'italic',
        'shadow-lg',
        'transition',
        'hover:bg-black/15',
        'rounded-4xl',
      ],
      tertiary: [
        'text-grass',
        'border-grass',
        'border-2',
        'rounded-4xl',
        'cursor-pointer',
        'font-unbounded',
        'uppercase',
      ],
      ghost: [
        'text-cream',
        'font-extrabold',
        'hover:bg-cream/15',
        'transition',
        'bg-transparent',
        'cursor-pointer',
        'rounded-4xl',
      ],
    },
    size: {
      // md is default size
      sm: ['text-xs', 'py-1', 'px-2'],
      md: ['text-base', 'py-2', 'px-4'],
      lg: ['text-2xl', 'py-3', 'px-6'],
    },
  },
  compoundVariants: [
    { intent: 'primary', size: 'lg', class: 'border-3' },
    { intent: 'secondary', size: 'lg', class: 'border-3' },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})

type BaseProps = VariantProps<typeof buttonVariants> & {
  className?: string
  children?: React.ReactNode
}

// One type for buttons
type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

// Another type for links
type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

export default function Button({
  href,
  intent,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ intent, size }), className)

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
