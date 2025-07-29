import Button from '@/components/ReusableButton/Button'
import { getExecs } from '@/queries/execs'
import { AboutPage } from './_components/AboutPage'

export default async function Page() {
  const { execs } = await getExecs()

  return (
    <>
      <AboutPage execs={execs} />
      <div className="absolute left-200 z-100">
        <Button intent="secondary" size="md">
          Hello World
        </Button>
      </div>
    </>
  )
}
