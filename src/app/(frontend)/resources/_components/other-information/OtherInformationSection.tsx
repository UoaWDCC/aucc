import { OtherInformationBackground } from './OtherInformationBackground'
import { OtherInformationHeading } from './OtherInformationHeading'
import { OtherInformationText } from './OtherInformationText'

export function OtherInformationSection() {
  return (
    <div className="relative mb-17 flex w-full items-start">
      <OtherInformationBackground />
      <OtherInformationText />
      <OtherInformationHeading />
    </div>
  )
}
