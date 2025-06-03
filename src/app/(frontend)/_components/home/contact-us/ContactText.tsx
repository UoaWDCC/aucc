import { FaFacebook, FaInstagram } from 'react-icons/fa'

export function ContactText() {
  return (
    <div className="flex w-full flex-col items-center px-4">
      {/* title*/}
      <div className="mt-64 mb-6 flex flex-row justify-center">
        <h1 className="font-heading text-cream rotate-[18.2deg] text-center text-4xl tracking-tighter">
          LOOKING FOR US?
        </h1>
      </div>

      {/* social media */}
      <div className="text-cream font-body absolute top-[28%] left-[15%] flex flex-col items-start gap-3 text-[14px] italic">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/aucanoeclub"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-algae flex flex-row items-center gap-3 transition-colors"
        >
          <FaInstagram className="text-algae text-2xl" />
          <span>aucanoeclub</span>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/AUCanoeClub"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-algae flex flex-row items-center gap-3 transition-colors"
        >
          <FaFacebook className="text-algae text-2xl" />
          <span>AUCanoeClub</span>
        </a>
      </div>
    </div>
  )
}
