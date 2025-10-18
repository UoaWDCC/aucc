import { Facebook, Instagram } from 'lucide-react'

import { ContactArrow } from './ContactArrow'

export function ContactText() {
  return (
    <div className="relative flex w-full flex-col items-center px-4 md:items-start md:px-0 md:pl-[10%]">
      {/* Title + Social Media Container */}
      <div className="w-full max-w-[480px] md:w-fit md:max-w-none">
        {/* Title Container */}
        <div className="relative mt-36 mb-27.5 flex justify-center md:mt-64 md:mb-6 md:justify-start xl:mr-6">
          <h1 className="font-heading text-cream text-center text-4xl tracking-tighter break-words md:text-left md:text-5xl">
            LOOKING FOR US?
          </h1>

          {/* Arrow inside title container */}
          <div className="hidden md:absolute md:top-[100%] md:left-[calc(100%+13px)] md:block">
            <ContactArrow />
          </div>
        </div>

        {/* Social Media */}
        <div className="text-cream font-body mt-12 flex w-fit flex-col items-start gap-3 text-sm italic md:mt-4 md:flex-row md:items-center md:gap-6 md:text-left md:text-[16px]">
          <a
            href="https://www.instagram.com/aucanoeclub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-algae flex flex-row items-center gap-3 transition-colors"
          >
            <Instagram className="text-algae text-2xl" />
            <span>aucanoeclub</span>
          </a>
          <a
            href="https://www.facebook.com/AUCanoeClub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-algae relative flex flex-row items-center gap-3 transition-colors"
          >
            <Facebook className="text-algae text-2xl" />
            <span>AUCanoeClub</span>

            {/* mobile-only arrow */}
            <ContactArrow mobile />
          </a>
        </div>
      </div>
    </div>
  )
}
