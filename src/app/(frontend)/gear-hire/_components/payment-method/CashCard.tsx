import { cn } from '@/lib/utils/cn'

function CashCardBackground({ className }: { className?: string }) {
  return (
    <div>
      <svg
        height="637"
        viewBox="0 0 623 637"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('fill-cream h-200 w-full', className)}
      >
        <path d="M623 115.731V637H0.857422L160.127 0L623 115.731Z" />
      </svg>
    </div>
  )
}

export function CashCardDetails() {
  return (
    <div>
      <h1 className="font-heading text-grass pb-7 text-2xl">2. Cash</h1>
      <p className="text-abyss front-body leading-6 italic">
        Payment can also be made in cash to the trip organiser or gearshed
        officer.
      </p>
    </div>
  )
}

export function CashCard() {
  return (
    <div className="relative mt-20 h-full w-full">
      <CashCardBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="-mt-10 text-left min-[1246px]:pr-30 min-[1246px]:pl-50">
          <CashCardDetails />
        </div>
      </div>
    </div>
  )
}
