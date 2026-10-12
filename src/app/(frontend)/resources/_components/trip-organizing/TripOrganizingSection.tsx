import { TripOrganizingBackground } from './TripOrganizingBackground'
import { TripOrganizingText } from './TripOrganizingText'
import { TripOrganizingVideos } from './TripOrganizingVideos'

export function TripOrganizingSection() {
  return (
    <div className="relative flex w-full flex-col">
      <TripOrganizingBackground>
        <TripOrganizingVideos />
        <TripOrganizingText />
      </TripOrganizingBackground>
    </div>
  )
}
