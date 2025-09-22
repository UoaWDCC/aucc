import Link from 'next/link'

import Button from '@/components/Button'

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-15">
      <div className="bg-cream/5 flex flex-col items-center gap-15 rounded-lg px-[20vw] py-[15vh]">
        <div className="text-cream font-heading text-center text-8xl">
          Page not
          <br />
          found!
        </div>
        <Button
          href="/"
          intent="outline"
          color="algae"
          size="lg"
          className="hover:bg-cream/5"
        >
          Return to Home
        </Button>
      </div>
    </div>
  )
}
