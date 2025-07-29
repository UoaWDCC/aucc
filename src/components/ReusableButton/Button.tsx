import React from 'react'
import Link from 'next/link'
import { cva } from 'class-variance-authority'

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
      primary: ['text-algae', 'cursor-pointer', 'rounded-3xl', 'border-2'],
      secondary: [
        'text-cream',
        'border-cream',
        'bg-transparent',
        'cursor-pointer',
        'rounded-4xl',
        'border-2',
        'italic',
        'shadow-lg',
        'transition',
        'hover:bg-black/15',
      ],
      tertiary: [],
    },
    size: {
      sm: ['text-xs', 'py-1', 'px-2'],
      md: ['text-base', 'py-2', '[px-4'],
    },
  },
})

export default function Button() {}
