'use client'

import { useEffect } from 'react'

import Button from '@/components/Button'

type ErrorMessageProps = {
  error: Error & { digest?: string }
  reset: () => void
  /** Where the secondary button goes, e.g. back to the list page. */
  href?: string
  linkText?: string
}

/**
 * Friendly error screen for Next.js error boundaries (error.tsx). It never
 * shows `error.message`, which can contain server details; the reference
 * code (digest) matches the server log entry for that error.
 */
export default function ErrorMessage({
  error,
  reset,
  href = '/',
  linkText = 'Return to Home',
}: ErrorMessageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      role="alert"
      className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-24"
    >
      <div className="bg-cream/5 flex max-w-3xl flex-col items-center gap-10 rounded-lg px-[8vw] py-[12vh]">
        <h1 className="text-cream font-heading text-center text-5xl md:text-7xl">
          Something went wrong
        </h1>
        <p className="text-cream/85 text-center text-lg md:text-xl">
          This page couldn&apos;t be loaded. Please try again in a moment.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            type="button"
            onClick={reset}
            intent="outline"
            color="algae"
            size="lg"
            className="hover:bg-cream/5"
          >
            Try again
          </Button>
          <Button
            href={href}
            intent="outline"
            color="cream"
            size="lg"
            className="hover:bg-cream/5"
          >
            {linkText}
          </Button>
        </div>
        {error.digest && (
          <p className="text-cream/50 text-center text-sm">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
