import Link from 'next/link'

const quickLinks = [
  {
    href: '/admin/collections/events/create',
    title: 'Add an event',
    description: 'Trips, socials and pool sessions.',
  },
  {
    href: '/admin/collections/trip-reports/create',
    title: 'Write a trip report',
    description: 'Share how a trip went.',
  },
  {
    href: '/admin/collections/gallery/create',
    title: 'Add gallery photos',
    description: 'Upload photos to the gallery page.',
  },
  {
    href: '/admin/collections/swims',
    title: 'Review swims',
    description: 'Approve swim photos members have sent in.',
  },
]

/** Plain-language introduction shown above the dashboard cards. */
export function WelcomePanel() {
  return (
    <section className="aucc-welcome">
      <h2 className="aucc-welcome__heading">
        Welcome to the AUCC website admin
      </h2>
      <p className="aucc-welcome__intro">
        Everything on the club website is edited from here. Changes appear on
        the site as soon as you press <strong>Save</strong>.
      </p>

      <ul className="aucc-welcome__links">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="aucc-welcome__link">
              <span className="aucc-welcome__link-title">{link.title}</span>
              <span className="aucc-welcome__link-description">
                {link.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <dl className="aucc-welcome__guide">
        <div>
          <dt>Club Content</dt>
          <dd>Things you add many of: events, trip reports, rivers, swims.</dd>
        </div>
        <div>
          <dt>Photos &amp; Videos</dt>
          <dd>Images and videos, and the tags used to sort the gallery.</dd>
        </div>
        <div>
          <dt>Website Pages</dt>
          <dd>The headings, text and header image on each page.</dd>
        </div>
      </dl>

      <p className="aucc-welcome__site">
        <a href="/" target="_blank" rel="noreferrer">
          View the website
        </a>
      </p>
    </section>
  )
}
