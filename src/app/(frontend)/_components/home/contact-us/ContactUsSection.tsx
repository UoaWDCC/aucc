import { ContactSectionBackground } from '../contact-us/ContactSectionBackground'
import { ContactArrow } from './ContactArrow'
import { ContactImages } from './ContactImages'
import { ContactText } from './ContactText'

export function ContactUsSection() {
  return (
    <div className="before:clip-path-[polygon(0_0,100%_0,100%_80%,0_100%)] before:bg-abyss relative min-h-[900px] w-full bg-[#121616] before:absolute before:inset-0 before:z-0">
      <ContactSectionBackground>
        {/* This div is now the main layout container for text/images/arrow */}
        {/* We'll make it relative, full width, and remove mx-auto and max-w-140 from the ContactImages' internal parent */}
        <div className="relative z-10 w-full overflow-hidden">
          {' '}
          {/* Added w-full, overflow-hidden */}
          <ContactText />
          <ContactImages />
          <ContactArrow />
        </div>
      </ContactSectionBackground>
    </div>
  )
}
