import React from 'react'
import Link from 'next/link'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
  'flex items-center justify-center text-center cursor-pointer',
  {
    variants: {
      intent: {
        primary: ['border-2', 'rounded-4xl'], // Default styled button
        outline: [
          'bg-transparent',
          'border-2',
          'italic',
          'shadow-lg',
          'transition',
          'hover:bg-black/15',
          'rounded-4xl',
        ],
        secondary: ['border-2', 'rounded-4xl', 'font-unbounded', 'uppercase'],
        ghost: [
          'font-unbounded',
          'transition',
          'bg-transparent',
          'rounded-4xl',
        ],
      },
      size: {
        // md is default size
        sm: ['text-sm', 'py-1', 'px-2', 'tracking-tighter'],
        md: ['text-base', 'py-2', 'px-4'],
        lg: ['text-2xl', 'py-3', 'px-6'],
      },
      color: {
        cream: ['text-cream', 'border-cream'],
        abyss: ['text-abyss', 'border-abyss'],
        algae: ['text-algae', 'border-algae'],
        grass: ['text-grass', 'border-grass'],
      },
    },
    compoundVariants: [
      { intent: 'primary', size: 'lg', class: 'border-3' },
      { intent: 'outline', size: 'lg', class: 'border-3' },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      color: 'cream',
    },
  },
)

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
  color,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ intent, size, color }), className)

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
