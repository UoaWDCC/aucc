import { Facebook, Instagram } from 'lucide-react'

export function ContactText() {
  return (
    <div className="flex w-full flex-col items-center px-4">
      {/* title */}
      <div className="mt-64 mb-6 flex flex-row justify-center">
        <h1 className="font-heading text-cream inline-block w-full rotate-[25.2deg] text-center text-[clamp(1.4rem,8vw,2rem)] tracking-tighter whitespace-nowrap md:mr-[25%] md:rotate-0 md:text-right md:text-[clamp(1.8rem,6vw,2.4rem)] lg:ml-[5%] lg:rotate-0 lg:text-right lg:text-[clamp(2rem,4vw,3rem)]">
          LOOKING FOR US?
        </h1>
      </div>

      {/* social media */}
      <div className="text-cream font-body absolute top-[27%] left-[5%] flex flex-col items-start gap-3 text-[14px] italic md:top-[24%] md:left-[21.5%] md:flex-row md:items-center md:gap-6 md:text-[12px] lg:top-[24.6%] lg:left-[21.8%] lg:flex-row lg:items-center lg:gap-6 lg:text-[16px] xl:top-[24.6%] xl:left-[25.2%] xl:flex-row xl:items-center xl:gap-6 xl:text-[16px]">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/aucanoeclub"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-algae flex flex-row items-center gap-3 transition-colors"
        >
          <Instagram className="text-algae text-2xl" />
          <span>aucanoeclub</span>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/AUCanoeClub"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-algae flex flex-row items-center gap-3 transition-colors"
        >
          <Facebook className="text-algae text-2xl" />
          <span>AUCanoeClub</span>
        </a>
      </div>
    </div>
  )
}

