import { UsefulLinksBackground } from './UsefulLinksBackground'
import { UsefulLinksCards } from './UsefulLinksCards'
import { UsefulLinksText } from './UsefulLinksHeading'

export function UsefulLinksSection() {
  return (
    <UsefulLinksBackground>
      <div className="flex w-full flex-col space-y-10 pt-10 pb-25 pl-37">
        <UsefulLinksText />
        <UsefulLinksCards />
      </div>
    </UsefulLinksBackground>
  )
}
