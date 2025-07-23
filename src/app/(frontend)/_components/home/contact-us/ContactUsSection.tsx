import { ContactSectionBackground } from '../contact-us/ContactSectionBackground'
import { ContactArrow } from './ContactArrow'
import { ContactImages } from './ContactImages'
import { ContactText } from './ContactText'

export function ContactUsSection() {
  return (
    <div className="before:bg-abyss before:clip-path-[polygon(0_0,100%_0,100%_85%,0_100%)] relative min-h-[900px] w-full bg-[#121616] before:absolute before:inset-0 before:z-0">
      <ContactSectionBackground>
        <div className="relative z-10 w-full overflow-hidden">
          <ContactText />
          <ContactImages />
          <ContactArrow />
        </div>
      </ContactSectionBackground>
    </div>
  )
}
