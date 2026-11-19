import { ResourceCard } from './ResourceCard'
import { UsefulLinksText } from './UsefulLinksHeading'

export function UsefulLinksCards() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-2 lg:gap-x-8">
      <div className="flex flex-col gap-8 lg:gap-12">
        <UsefulLinksText />
        <ResourceCard
          className="lg:ml-16"
          title="MEMBER CODE OF CONDUCT"
          description="Behaviour which goes against our code will be addressed though appropriate interventions, regardless of severity. If you believe there has been behaviour which contravenes this Code, please reach out and report it though the complaint process."
          links={[
            {
              label: 'CODE OF CONDUCT',
              href: 'https://drive.google.com/file/d/1Ur494ge6rQmpi8xaB8mhLCVIUnAnZ7ny/view?usp=sharing',
            },
            {
              label: 'FORMAL COMPLAINT PROCESS',
              href: 'https://docs.google.com/document/d/1t84trqTszPgwpd1IZuQJxJDD-0dBDtM_fIobY3OFmoo/edit?usp=sharing',
            },
          ]}
        />
        <ResourceCard
          inline
          className="lg:mr-16"
          title="LEGAL POLICY"
          links={[
            {
              label: 'AUCC CONSTITUTION',
              href: 'http://media.wix.com/ugd/b21f02_0d1e26de398145149a3a5abc63976467.pdf',
            },
            { label: 'GEAR HIRE POLICY', href: '/gear-hire' },
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 lg:gap-12 lg:pt-12">
        <ResourceCard
          title="CLUB PUBLIC LIBRARY"
          description="The Public Library is an online archive containing things like river guides, maps, the constitution, safe operating plans, the gear hire policy, AGM meeting minutes, and various archived updates."
          links={[
            {
              label: 'LIBRARY',
              href: 'https://drive.google.com/drive/folders/1Y8VaTakcVwgN3s1UIHdPa5hAHoHplnNc?usp=sharing',
            },
          ]}
        />
        <ResourceCard
          className="lg:ml-12"
          title="BEGINNER INFORMATION"
          description="Useful guides if you're a beginner:"
          links={[
            {
              label: 'HOW TO HAVE A GOOD DAY ON THE RIVER',
              href: 'https://drive.google.com/file/d/1FEGhK0jm6E7m3nvB3ibz7YjeHhtlX84_/view?usp=sharing',
            },
            {
              label: 'POOL TRAINING GUIDES & TECHNIQUES',
              href: 'https://drive.google.com/file/d/18SGYIKmnTvichciizlvpp4fwKnaDW8EY/view?usp=sharing',
            },
          ]}
        />
      </div>
    </div>
  )
}
