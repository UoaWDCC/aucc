import { BankTransferCard, BankTransferCardDetails } from './BankTransferCard'
import { CashCard, CashCardDetails } from './CashCard'

export function PaymentMethods() {
  return (
    <div className="bg-abyss h-full min-h-200 w-full">
      <h1 className="font-heading flex justify-center pt-30 text-center text-4xl text-[#D3E2DA] min-[1235px]:justify-start min-[1235px]:pl-30 min-[1235px]:text-start md:text-5xl">
        Payment Methods
      </h1>
      <div className="hidden min-[1246px]:block">
        <div className="relative -mt-41 flex w-full min-[1246px]:flex-row">
          <BankTransferCard />
          <CashCard />
        </div>
      </div>
      <div className="block min-[1246px]:hidden">
        <div className="bg-cream mx-8 my-15 h-full md:mx-20">
          <div className="flex flex-col gap-10 px-5 py-10 md:px-20">
            <BankTransferCardDetails />
            <CashCardDetails />
          </div>
        </div>
      </div>
    </div>
  )
}
