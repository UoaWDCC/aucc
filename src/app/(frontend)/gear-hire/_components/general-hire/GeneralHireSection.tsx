import { ClubGearHire } from './ClubGearHire'
import { GeneralHirePrice } from './GeneralHirePrice'
import { GeneralHireTitle } from './GeneralHireTitle'

export function GeneralHireSection() {
  return (
    <section className="relative">
      <div
        className="bg-water absolute inset-x-0 top-105 bottom-0"
        style={{
          clipPath: 'polygon(0 55%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      ></div>
      <div className="relative mt-10 h-full w-full lg:-mt-12 lg:px-20">
        <GeneralHireTitle />
        <div className="mt-10 flex justify-center px-5 md:px-20 lg:mt-15 lg:px-0">
          <div className="flex w-full flex-col-reverse items-center justify-center gap-20 lg:flex-row lg:gap-25">
            <div className="flex w-full flex-col items-center lg:w-[40%]">
              <GeneralHirePrice />
            </div>
            <div className="flex w-full flex-col items-center lg:w-[60%]">
              <ClubGearHire />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
