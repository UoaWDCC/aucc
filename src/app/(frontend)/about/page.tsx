import Button from '@/components/ReusableButton'
import { getExecs } from '@/queries/execs'
import { AboutPage } from './_components/AboutPage'

export default async function Page() {
  const { execs } = await getExecs()

  return (
    <>
      <AboutPage execs={execs} />
    </>
  )
}
