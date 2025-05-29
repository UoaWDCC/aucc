import { AgendaArrow } from './Agenda'
import { IntroImages } from './IntroImages'
import { IntroSectionBackground } from './IntroSectionBackground'
import { IntroText } from './IntroText'

export default function IntroSection() {
  return (
    <IntroSectionBackground>
      <div className="relative z-2 h-235">
        <IntroText />
        <IntroImages />
        <AgendaArrow />
      </div>
    </IntroSectionBackground>
  )
}
