import { OtherInformationBackground } from './OtherInformationBackground'
import { OtherInformationHeading } from './OtherInformationHeading'
import { OtherInformationText } from './OtherInformationText'

export function OtherInformationSection() {
  return (
    <section className="bg-abyss relative w-full overflow-hidden">
      <OtherInformationBackground />
      <div className="relative flex flex-col items-center gap-10 px-4 py-16 md:px-8 md:py-24 xl:flex-row xl:items-stretch xl:gap-0 xl:px-0 xl:py-40">
        <OtherInformationText />
        <OtherInformationHeading />
      </div>
    </section>
  )
}
