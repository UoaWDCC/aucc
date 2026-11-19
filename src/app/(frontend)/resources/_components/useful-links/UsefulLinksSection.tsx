import { UsefulLinksBackground } from './UsefulLinksBackground'
import { UsefulLinksCards } from './UsefulLinksCards'

export function UsefulLinksSection() {
  return (
    <UsefulLinksBackground>
      <div className="pt-10 pb-16 md:pb-25">
        <UsefulLinksCards />
      </div>
    </UsefulLinksBackground>
  )
}
