import { UpcomingBackground } from './UpcomingEventsBackground'
import { UpcomingEventsBox } from './UpcomingEventsBox'
import { UpcomingText } from './UpcomingEventsText'

export function UpcomingSection() {
  return (
    <UpcomingBackground>
      <div className="flex w-full flex-col items-start px-4 md:px-8 xl:px-20">
        <div className="flex w-full flex-col gap-y-10 md:flex-row md:items-start md:gap-x-12">
          <div className="md:w-[60%] xl:w-[65%]">
            <UpcomingText />
          </div>
          <div className="md:w-[40%] xl:w-[35%]">
            <UpcomingEventsBox />
          </div>
        </div>
      </div>
    </UpcomingBackground>
  )
}
