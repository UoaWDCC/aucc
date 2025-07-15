import { Facebook, Instagram } from 'lucide-react'

import { ContactArrow } from './ContactArrow'

export function ContactText() {
  return (
    <div className="relative flex w-full flex-col px-4 md:px-0 md:pl-[10%]">
      {/* title + arrow container */}
      <div className="relative mt-36 mb-6 w-full md:mt-64 md:w-fit">
        <h1 className="font-heading text-cream xs:text-3xl s:text-4xl m:text-5xl text-center text-2xl tracking-tighter whitespace-nowrap md:text-left md:text-5xl">
          LOOKING FOR US?
        </h1>

        {/* arrow: only show in md and up */}
        <ContactArrow />
      </div>

      {/* social media */}
      <div className="text-cream font-body xs:left-[24px] s:left-[36px] absolute top-[calc(100%+60px)] left-[16px] mt-4 flex flex-col items-start gap-3 text-[14px] italic md:static md:flex-row md:items-center md:gap-6 md:pl-0 md:text-[16px]">
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

          {/* mobile-only arrow shown next to AUCCanoeClub */}
          <ContactArrow mobile />
        </a>
      </div>
    </div>
  )
}
