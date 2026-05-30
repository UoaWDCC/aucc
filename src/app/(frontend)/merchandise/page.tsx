import { getMerchGlobal } from '@/queries/merch-global'
import { MerchandisePage } from './_components/header/MerchandiseHeaderSection'
import { MerchProductSection } from './_components/header/MerchProductSection'

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
