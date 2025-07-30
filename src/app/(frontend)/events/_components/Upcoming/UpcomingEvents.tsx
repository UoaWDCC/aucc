import { UpcomingBackground } from './UpcomingEventsBackground'
//import { UpcomingBox } from './UpcomingEventsBox'
import { UpcomingText } from './UpcomingEventsText'

export function UpcomingSection() {
  return (
    <UpcomingBackground>
      <div className="relative z-2 h-auto xl:h-195">
        <UpcomingText />
      </div>
    </UpcomingBackground>
  )
}
