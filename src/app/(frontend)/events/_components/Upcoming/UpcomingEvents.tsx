import { UpcomingBackground } from './UpcomingEventsBackground'
import { UpcomingEventsBox } from './UpcomingEventsBox'
import { UpcomingText } from './UpcomingEventsText'

export function UpcomingSection() {
  return (
    <UpcomingBackground>
      <div className="flex w-full flex-col items-center px-4 md:items-start md:px-8 xl:px-20">
        <div className="flex w-full flex-col items-center gap-y-10 md:flex-row md:items-start md:gap-x-12">
          <div className="w-full max-w-[80%] md:w-[60%] md:max-w-none">
            <UpcomingText />
          </div>
          <div className="w-full max-w-md md:w-[40%] md:max-w-none">
            <UpcomingEventsBox />
          </div>
        </div>
      </div>
    </UpcomingBackground>
  )
}
