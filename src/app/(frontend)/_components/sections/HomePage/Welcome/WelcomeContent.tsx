import { AgendaArrow } from './Agenda'
import { WelcomeImages } from './WelcomeImages'
import { WelComeText } from './WelcomeText'

export function WelcomeContent() {
  return (
    <div className="relative h-235 md:h-197.5">
      <WelComeText />
      <WelcomeImages />
      <AgendaArrow />
    </div>
  )
}
