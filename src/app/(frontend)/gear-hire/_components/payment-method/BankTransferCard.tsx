import { cn } from '@/lib/utils/cn'

function BankTransferBackground({ className }: { className?: string }) {
  return (
    <div>
      <svg
        height="508"
        viewBox="0 0 706 508"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('fill-cream h-168 w-full', className)}
      >
        <path d="M705.228 152.295L616.29 508H0V396.479L98.9551 0.708984L705.228 152.295Z" />
      </svg>
    </div>
  )
}

export function BankTransferCardDetails() {
  return (
    <div>
      <h1 className="font-heading text-grass pb-7 text-2xl">
        1. Bank transfer
      </h1>
      <div className="text-abyss front-body justify-center leading-6 italic">
        <p>Please make prompt payment to:</p>
        <p className="pt-5">{`Auckland University Canoe Club Inc. (AUCC)`}</p>
        <p>12-3011-0758443-00</p>
        <p className="pb-5">ASB Bank</p>
        <p>{`Make sure you provide a reference so we can easily identify payment. For example, your name and "GEAR".`}</p>
      </div>
    </div>
  )
}

export function BankTransferCard() {
  return (
    <div className="relative mt-52 h-full w-full">
      <BankTransferBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-left max-[1390px]:pl-30 min-[1246px]:pr-30 min-[1246px]:pl-40">
          <BankTransferCardDetails />
        </div>
      </div>
    </div>
  )
}
