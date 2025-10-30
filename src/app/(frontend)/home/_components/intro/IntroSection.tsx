import { AgendaArrow } from './AgendaArrow'
import { IntroImages } from './IntroImages'
import { IntroSectionBackground } from './IntroSectionBackground'
import { IntroText } from './IntroText'

export function IntroSection() {
  return (
    <IntroSectionBackground>
      <div className="relative z-2 h-auto xl:h-195">
        <IntroText />
        <IntroImages />
        <AgendaArrow />
      </div>
    </IntroSectionBackground>
  )
}
