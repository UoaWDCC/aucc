import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { BlackCurve } from './BlackCurve'

type HiringProcedureSectionProps = {
  introText: SerializedEditorState
}
export function HiringProcedureSection({
  introText,
}: HiringProcedureSectionProps) {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <BlackCurve />
      </div>

      <div className="relative mx-2 flex flex-col-reverse lg:flex-row lg:gap-30">
        <div className="lg:w-[60%]">
          <h1 className="font-heading text-cream flex justify-center self-center text-center text-4xl leading-[1.5] md:text-5xl lg:ml-27 lg:justify-start lg:self-start lg:pt-30 lg:text-left">
            Hiring Procedure
          </h1>
          <div className="bg-cream mx-3 mt-5 h-[80%] md:mx-20 md:mt-8 lg:mx-0 lg:mt-13 lg:ml-27">
            <div className="text-abyss front-body mx-5 py-7 italic md:mx-20 md:py-10 lg:pt-15 lg:pb-5">
              <p>
                Applied to all use of club gear outside of AUCC trips where
                hireage is specified by the trip organiser.
              </p>
              <div className="pt-5 leading-6">
                <ol className="list-decimal pl-5">
                  <li>
                    Gear is requested with reasonable notice (3 days) via a form
                    accessed on the AUCC website (
                    <a
                      href="https://www.aucc.org.nz/gearhire"
                      className="underline hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.aucc.org.nz/gearhire
                    </a>
                    ).
                  </li>
                  <li>
                    Gear Shed Officers (GSOs) will request additional details if
                    required.
                  </li>
                  <li>
                    GSOs will determine the hireage request and, if approved,
                    provide a pickup time or access codes to the gear shed. If
                    you are collecting for someone else, ensure the hireage is
                    approved before collecting. Sending a request does not equal
                    approval for gear hire.**
                  </li>
                  <li>
                    On completion of hireage, hiree provides GSOs with
                    notification (ideally via email) of gear return, prompt
                    payment, and incidents over the period.
                  </li>
                </ol>

                <p className="pt-5">
                  The Gear Hire Policy (
                  <a
                    href="https://www.aucc.org.nz/gearhirepolicy"
                    className="underline hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.aucc.org.nz/gearhirepolicy
                  </a>
                  ) applies to all hireage. This sets out conditions and
                  explains liability for damaged or lost gear.
                </p>
                <p>
                  Any breach of practice will be logged and penalties or
                  lockouts applied as deemed appropriate by the GSOs and
                  committee.
                </p>
                <p className="pt-5">{`** If extenuating circumstances mean additional gear is required at the last minute, please contact the GSOs directly. If the GSO cannot be reached, contact an exec member and they will check for gear availability and notify us of the additional gear movement. `}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center px-10 pb-15 md:px-20 lg:w-[40%] lg:justify-start lg:px-0 lg:pr-20">
          <RichText
            className="font-body text-cream leading-5 italic md:leading-6"
            data={introText}
          />
        </div>
      </div>
    </section>
  )
}
