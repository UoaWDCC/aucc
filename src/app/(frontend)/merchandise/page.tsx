import { getMerchGlobal } from '@/queries/merch-global'
import { MerchProductSection } from './_components/header/MerchProductSection'
import { MerchandisePage } from './_components/MerchandisePage'

export default async function MerchPage() {
  const merch = await getMerchGlobal()

  console.log('MERCH DATA:', merch)

  return (
    <>
      <MerchandisePage />

      <MerchProductSection sections={(merch.sections ?? []) as any} />
    </>
  )
}
