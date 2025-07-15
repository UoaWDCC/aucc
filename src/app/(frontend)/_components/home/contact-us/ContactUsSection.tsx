import { ContactSectionBackground } from '../contact-us/ContactSectionBackground'
import { ContactArrow } from './ContactArrow'
import { ContactImages } from './ContactImages'
import { ContactText } from './ContactText'

export function ContactUsSection() {
  return (
    <ContactSectionBackground>
      <ContactText />
      <ContactImages />
    </ContactSectionBackground>
  )
}
