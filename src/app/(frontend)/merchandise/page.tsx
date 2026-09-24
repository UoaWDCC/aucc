import { getMerchGlobal } from '@/queries/merch-global'
import { MerchandisePage } from './_components/MerchandisePage'

export default async function Page() {
  const { headerImage, introText, items } = await getMerchGlobal()

  return (
    <MerchandisePage
      headerImage={headerImage}
      introText={introText}
      items={items}
    />
  )
}
