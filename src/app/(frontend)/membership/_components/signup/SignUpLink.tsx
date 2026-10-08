import { ArrowRight } from 'lucide-react'

import Button from '@/components/Button'
import { SignUpClosed } from '../errors/SignUpClosed'

export function SignUpLink({ url }: { url: string }) {
  if (!url) return <SignUpClosed />
  return (
    <Button
      href={url}
      intent="primary"
      size="md"
      className="font-unbounded text-abyss mx-auto w-fit max-w-full gap-2 border-0 bg-[#98b969] px-3 py-2 text-xs font-bold whitespace-nowrap uppercase sm:px-5 sm:py-3 sm:text-sm"
      target="_blank"
      rel="noreferrer"
    >
      Fill in the membership form{' '}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
      />
    </Button>
  )
}
