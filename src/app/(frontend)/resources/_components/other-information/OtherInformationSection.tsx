import { OtherInformationBackground } from './OtherInformationBackground'
import { OtherInformationHeading } from './OtherInformationHeading'
import { OtherInformationText } from './OtherInformationText'

export function OtherInformationSection() {
  return (
    <section className="bg-abyss relative w-full overflow-hidden">
      <OtherInformationBackground />
      <div className="relative flex flex-col items-center gap-10 px-4 py-16 md:flex-row md:items-stretch md:gap-0 md:px-0 md:py-32">
        <OtherInformationText />
        <OtherInformationHeading />
      </div>
    </section>
  )
}
