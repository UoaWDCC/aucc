import { UpcomingBackground } from './UpcomingEventsBackground'
import { UpcomingEventsBox } from './UpcomingEventsBox'
import { UpcomingText } from './UpcomingEventsText'

export function UpcomingSection() {
  return (
    <UpcomingBackground>
      <div className="flex w-full flex-col items-start md:flex-row md:items-start xl:gap-20">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          <UpcomingText />
          <UpcomingEventsBox />
        </div>
      </div>
    </UpcomingBackground>
  )
}
