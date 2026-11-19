import type { SiteSettingsDTO } from '@/queries/site-settings'

type ContactUsSectionProps = Pick<
  SiteSettingsDTO,
  'contactEmail' | 'contactNote' | 'address'
>

// Below xl the heading and award circle stack. From xl up the circle sits
// against the right edge, as designed.
export function ContactUsSection({
  contactEmail,
  contactNote,
  address,
}: ContactUsSectionProps) {
  return (
    <div className="relative flex w-full -translate-y-1 flex-col items-center gap-10 bg-[#A3C6C2] px-6 pt-16 pb-[24vw] xl:h-200 xl:flex-row xl:justify-center xl:gap-0 xl:p-0">
      <div className="relative z-60 text-center xl:-translate-y-28 xl:px-6">
        <h2 className="text-cream font-heading text-4xl md:text-6xl">
          Contact Us
        </h2>
        {contactEmail ? (
          <a
            href={`mailto:${contactEmail}`}
            className="text-abyss font-body mt-6 inline-block text-lg font-medium break-all underline underline-offset-4 md:text-xl"
          >
            {contactEmail}
          </a>
        ) : null}
        {address ? (
          <p className="text-abyss font-body mt-3 whitespace-pre-line">
            {address}
          </p>
        ) : null}
        {contactNote ? (
          <p className="text-abyss font-body mx-auto mt-4 max-w-md text-sm italic">
            {contactNote}
          </p>
        ) : null}
      </div>
      <div className="border-cream relative z-50 flex h-72 w-72 items-center justify-center rounded-full border-5 bg-transparent xl:absolute xl:-right-22 xl:bottom-0 xl:h-163 xl:w-163 xl:items-start xl:rounded-[650px]">
        <div className="text-cream text-heading font-unbounded max-w-[220px] text-center text-2xl font-bold xl:mt-20 xl:w-90 xl:max-w-none xl:px-8 xl:text-right xl:text-5xl">
          2020 SUPREME CLUB OF THE YEAR
        </div>
      </div>
    </div>
  )
}
