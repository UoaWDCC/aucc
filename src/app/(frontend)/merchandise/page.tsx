import { getMerchGlobal } from '@/queries/merch-global'
import { MerchandisePage } from './_components/MerchandisePage'

export default async function Page() {
  const merch = await getMerchGlobal()

  return <MerchandisePage merch={merch} />
}
