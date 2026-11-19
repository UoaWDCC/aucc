import { buildPageMetadata, headerImageOf } from '@/lib/page-metadata'
import { getMerchGlobal } from '@/queries/merch-global'
import { MerchandisePage } from './_components/MerchandisePage'

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Merch',
    description: 'AUCC t-shirts, stickers, board shorts and more.',
    path: '/merchandise',
    image: await headerImageOf(getMerchGlobal),
  })
}

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
