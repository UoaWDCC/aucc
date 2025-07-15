import { Facebook, Instagram } from 'lucide-react'

import { ContactArrow } from './ContactArrow'

export function ContactText() {
  return (
    <div className="flex size-full items-start justify-center md:items-center md:justify-start">
      <div className="relative mx-4 w-fit md:ml-20 md:pr-80 xl:ml-40">
        <h1 className="font-heading text-cream mt-40 mb-10 w-fit text-left text-3xl leading-11 tracking-tighter sm:text-4xl md:my-0 md:text-4xl xl:text-5xl">
          LOOKING FOR US?
        </h1>
        <div className="flex items-center gap-4 md:justify-between">
          <div className="text-cream font-body flex flex-col gap-4 text-sm md:flex-row">
            <a
              href="https://www.instagram.com/aucanoeclub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-algae flex items-center gap-3 transition-colors"
            >
              <Instagram className="text-algae size-6" />
              <span>aucanoeclub</span>
            </a>
            <a
              href="https://www.facebook.com/AUCanoeClub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-algae relative flex items-center gap-3 transition-colors"
            >
              <Facebook className="text-algae size-6" />
              <span>AUCanoeClub</span>
            </a>
          </div>
          <ContactArrow className="md:translate-x-10 md:-translate-y-5" />
        </div>
      </div>
    </div>
  )
}
