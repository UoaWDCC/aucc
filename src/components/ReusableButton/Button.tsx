import React, { Children } from 'react'
import Link from 'next/link'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/cn'

/*
{
  const baseStyle = 'flex items-center justify-center text-center'

  cream:
    'text-cream border-cream bg-transparent cursor-pointer rounded-4xl border-2 italic shadow-lg transition hover:bg-black/15',
  algae: 'text-algae cursor-pointer rounded-3xl border-2 text-xs',
  default: 'text-cream cursor-pointer bg-transparent border-2 rounded-4xl',
}
*/

const buttonVariants = cva('flex items-center justify-center text-center', {
  variants: {
    intent: {
      primary: ['text-algae', 'cursor-pointer', 'border-2', 'rounded-4xl'],
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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { children?: React.ReactNode }

export default function Button({
  children,
  intent,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ intent, size }), className)}
      {...props}
    >
      {children}
    </button>
  )
}
