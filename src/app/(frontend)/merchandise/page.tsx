import { getMerchGlobal } from '@/queries/merch-global'
import { MerchProductSection } from './_components/header/MerchProductSection'
import { MerchandisePage } from './_components/MerchandisePage'
import { MerchItemCard } from './_components/MerchItemCard'

export default async function MerchPage() {
  const merch = await getMerchGlobal()

  return (
    <>
      <MerchandisePage />

      <MerchProductSection sections={(merch.sections ?? []) as any} />
    </>
  )
}
