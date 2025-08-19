import { SpecificRiverHeaderBackground } from './SpecificRiverHeaderBackground'
import { SpecificRiverHeaderText } from './SpecificRiverHeaderText'

export function SpecificRiverHeader() {
  const description = `The Rangitaiki is the longest river in the Bay of Plenty. The Aniwhenua
        is a great beginner trip, or just a cool spot to play around with some
        good mates. There are quite a few surf waves and eddy lines to practice
        up your skills on. Many kayak clubs use this as a skills building trip
        for beginners and advanced alike. The bonus is that it can be done all
        year-round, as the source is the Aniwhenua reservoir. Words by
        CalebTarzwell Photos Martin Robertson.`
  return (
    <SpecificRiverHeaderBackground>
      <div className="ml-22 w-163">
        <SpecificRiverHeaderText description={description} />
      </div>
    </SpecificRiverHeaderBackground>
  )
}
