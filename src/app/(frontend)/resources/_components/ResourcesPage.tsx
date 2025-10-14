import { Media } from '@/payload-types'
import { ResourcesHeaderSection } from './header/ResourcesHeaderSection'
import { OtherInformationSection } from './other-information/OtherInformationSection'
import { TripOrganizingSection } from './trip-organizing/TripOrganizingSectieon'
import { UsefulLinksSection } from './useful-links/UsefulLinksSection'

interface ResourcesPageProps {
  headerImage: Media
}

export function ResourcesPage({ headerImage }: ResourcesPageProps) {
  return (
    <>
      <ResourcesHeaderSection headerImage={headerImage} />
      <UsefulLinksSection />
      <TripOrganizingSection />
      <OtherInformationSection />
    </>
  )
}
