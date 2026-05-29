import { getMerchGlobal } from '@/queries/merch-global'
import { MerchandisePage } from './_components/header/MerchandiseHeaderSection'
import { MerchProductSection } from './_components/header/MerchProductSection'

export default async function MerchPage() {
  const merch = await getMerchGlobal()

  return (
    <>
      <MerchandisePage />

      <MerchProductSection sections={merch.sections} />
    </>
  )
}
