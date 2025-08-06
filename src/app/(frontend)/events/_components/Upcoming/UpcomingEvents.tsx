import { UpcomingBackground } from './UpcomingEventsBackground'
import { UpcomingEventsBox } from './UpcomingEventsBox'
import { UpcomingText } from './UpcomingEventsText'

export function UpcomingSection() {
  return (
    <UpcomingBackground>
      <div className="w-full px-4 md:px-8 xl:px-20">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-y-10 md:flex-row md:items-start md:gap-x-12">
          <div className="w-full md:w-[60%]">
            <UpcomingText />
          </div>
          <div className="w-full md:w-[40%]">
            <UpcomingEventsBox />
          </div>
        </div>
      </div>
    </UpcomingBackground>
  )
}
