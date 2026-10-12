import { OtherInformationBackground } from './OtherInformationBackground'
import { OtherInformationHeading } from './OtherInformationHeading'
import { OtherInformationText } from './OtherInformationText'

export function OtherInformationSection() {
  return (
    <section className="bg-abyss relative w-full overflow-hidden">
      <OtherInformationBackground />
      <div className="relative flex flex-col items-center gap-10 px-4 py-16 md:px-8 md:py-24 lg:flex-row lg:items-stretch lg:gap-0 lg:px-0 lg:py-40">
        <OtherInformationText />
        <OtherInformationHeading />
      </div>
    </section>
  )
}
