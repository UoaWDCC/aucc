type InfoLink = {
  label: string
  href: string
  description?: string
}

const SECTIONS: { title: string; links: InfoLink[] }[] = [
  {
    title: 'River Information and flows',
    links: [
      {
        label: 'Whitewater New Zealand website',
        href: 'https://whitewater.nz/',
        description:
          ': New Zealand River Beta (RiverGuide), events, resources, and more...',
      },
      {
        label: 'Environment Waikato',
        href: 'http://www.waikatoregion.govt.nz/',
        description: ': flow data for K Gorge',
      },
      {
        label: 'Environment Bay of Plenty',
        href: 'http://www.boprc.govt.nz/environment/',
        description: ': flow data for bay of plenty rivers',
      },
      {
        label: 'Genesis Energy',
        href: 'https://www.genesisenergy.co.nz/home',
        description: ': for flow data for the Tongariro',
      },
      { label: 'River Valley', href: 'http://www.rivervalley.co.nz/' },
    ],
  },
  {
    title: 'Other Whitewater Clubs',
    links: [
      {
        label: 'Hawkes Bay Canoe Club',
        href: 'http://www.sportsground.co.nz/hbcc/',
      },
      {
        label: 'Kaimai Canoe Club',
        href: 'http://www.kaimaicanoeclub.org.nz/',
      },
      {
        label: 'Waikato Canoe Club',
        href: 'https://www.facebook.com/groups/5883361179/',
      },
      {
        label: 'Whitewater Canoe Club (Christchurch)',
        href: 'http://whitewater.org.nz/',
      },
      {
        label: 'Victoria University Canoe Club (VUCC)',
        href: 'http://vucc.nz/#/',
      },
      {
        label: 'University of Canterbury Canoe Club (UCCC)',
        href: 'http://uccc.org.nz/index.php/uccc/main_content/start',
      },
      {
        label: 'Exeter University Canoe Club',
        href: 'http://www.exetercanoeclub.org.uk/',
        description:
          ", because Exeter rocks and you have to go kayaking with the canoe club there if you're in the UK!",
      },
    ],
  },
  {
    title: 'Safety Rescue & First Aid',
    links: [
      {
        label: 'Mountain Safety Council',
        href: 'https://www.mountainsafety.org.nz/',
        description: ' - Free downloads, buy books and survival equipment',
      },
    ],
  },
  {
    title: 'Other',
    links: [
      {
        label: 'http://www.cumecmagazine.com/',
        href: 'http://www.cumecmagazine.com/',
        description:
          ' NZ and Oz whitewater mag featuring news, updates, and pics.',
      },
      {
        label: 'Playak',
        href: 'http://playak.com/',
        description:
          ', Gives boat specs for almost any boat out there and has a sweet comparison function',
      },
      {
        label: 'http://whitewaterinstruction.com/',
        href: 'http://whitewaterinstruction.com/',
        description: ' Cool instructional videos from Shane Benedict',
      },
      {
        label:
          'http://www.ehow.com/videos-on_1265_rodeo-kayaking-tips-freestyle-techniques.html',
        href: 'http://www.ehow.com/videos-on_1265_rodeo-kayaking-tips-freestyle-techniques.html',
        description: ' Some "how to playboat" instructional videos',
      },
      {
        label: 'http://www.urbandictionary.com/define.php?term=AUCC',
        href: 'http://www.urbandictionary.com/define.php?term=AUCC',
        description: ' Urban dictionary definition for AUCC',
      },
    ],
  },
]

export function OtherInformationText() {
  return (
    <div className="relative w-full lg:w-auto lg:shrink-0">
      <div
        aria-hidden
        className="from-cream to-seafoam absolute top-1/2 left-1/2 hidden aspect-square h-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b lg:block"
      />
      <div className="from-cream to-seafoam relative flex flex-col gap-10 rounded-[2.5rem] bg-gradient-to-b px-6 py-12 md:gap-16 md:px-12 lg:rounded-none lg:bg-none lg:py-0 lg:pr-24 lg:pl-[max(2rem,8vw)]">
        {SECTIONS.map((section) => (
          <div key={section.title} className="flex max-w-109 flex-col">
            <h3 className="font-heading text-algae text-base uppercase md:text-lg">
              {section.title}
            </h3>
            <div className="text-abyss font-body mt-3 flex flex-col text-sm italic">
              {section.links.map((link) => (
                <p key={link.href} className="break-words">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {link.label}
                  </a>
                  {link.description}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
