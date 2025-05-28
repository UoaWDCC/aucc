import { AgendaArrow } from './Agenda'
import { WelcomeImages } from './WelcomeImages'
import { WelcomeSectionBackground } from './WelcomeSectionBackground'
import { WelcomeText } from './WelcomeText'

export default function WelcomeSection() {
  return (
    <div className="relative">
      <WelcomeSectionBackground />
      <div className="z-2">
        <div className="relative h-235 md:h-197.5">
          <WelcomeText />
          <WelcomeImages />
          <AgendaArrow />
        </div>
      </div>
    </div>
  )
}
