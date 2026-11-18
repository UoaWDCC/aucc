import type { SiteSettingsDTO } from '@/queries/site-settings'

type ContactUsSectionProps = Pick<
  SiteSettingsDTO,
  'contactEmail' | 'contactNote' | 'address'
>

export function ContactUsSection({
  contactEmail,
  contactNote,
  address,
}: ContactUsSectionProps) {
  return (
    <div className="relative flex h-200 w-full -translate-y-1 items-center justify-center bg-[#A3C6C2]">
      <div className="relative z-60 -translate-y-28 px-6 text-center">
        <h2 className="text-cream font-heading text-5xl md:text-6xl">
          Contact Us
        </h2>
        {contactEmail ? (
          <a
            href={`mailto:${contactEmail}`}
            className="text-abyss font-body mt-6 inline-block text-lg font-medium underline underline-offset-4 md:text-xl"
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
      <div className="border-cream absolute -right-22 bottom-0 z-50 flex h-163 w-163 items-start justify-center rounded-[650px] border-5 bg-transparent">
        <div className="text-cream text-heading font-unbounded mt-20 w-90 px-8 text-right text-5xl font-bold">
          2020 SUPREME CLUB OF THE YEAR
        </div>
      </div>
    </div>
  )
}
