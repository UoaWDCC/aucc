import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'

import { Logo } from '@/assets/Logo'
import { SocialIcon } from '@/components/SocialIcon'
import { getSiteSettings } from '@/queries/site-settings'

const isExternal = (href: string) => /^https?:\/\//.test(href)

export async function Footer() {
  const { contactEmail, address, socials, footerLinks } =
    await getSiteSettings()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-abyss text-cream font-body">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3 md:px-10 md:py-16">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="AUCC home"
          >
            <span className="block h-12 w-12 shrink-0">
              <Logo />
            </span>
            <span className="font-unbounded text-sm leading-tight font-semibold">
              Auckland University
              <br />
              Canoe Club
            </span>
          </Link>

          {contactEmail || address ? (
            <address className="flex flex-col gap-2 text-sm not-italic">
              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-2 underline-offset-4 hover:underline"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  {contactEmail}
                </a>
              ) : null}
              {address ? (
                <p className="flex items-start gap-2 whitespace-pre-line">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0"
                  />
                  {address}
                </p>
              ) : null}
            </address>
          ) : null}
        </div>

        {footerLinks && footerLinks.length > 0 ? (
          <nav aria-label="Footer">
            <h2 className="font-unbounded mb-4 text-xs font-semibold tracking-widest uppercase">
              Explore
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.id ?? link.href}>
                  <Link
                    href={link.href}
                    {...(isExternal(link.href)
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          // Keeps the socials in the right-hand column on desktop
          <div className="hidden md:block" />
        )}

        <div className="flex flex-col gap-6">
          {socials && socials.length > 0 ? (
            <div>
              <h2 className="font-unbounded mb-4 text-xs font-semibold tracking-widest uppercase">
                Follow us
              </h2>
              <ul className="flex flex-col gap-2 text-sm">
                {socials.map((social) => (
                  <li key={social.id ?? social.url}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 underline-offset-4 hover:underline"
                    >
                      <SocialIcon
                        platform={social.platform}
                        className="text-algae size-4 shrink-0"
                      />
                      {social.handle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Link
            href="/membership"
            className="bg-algae text-abyss font-unbounded w-fit rounded-lg px-5 py-2 text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-90"
          >
            Join the club
          </Link>
        </div>
      </div>

      <div className="border-cream/15 border-t">
        <p className="mx-auto max-w-6xl px-6 py-4 text-xs opacity-80 md:px-10">
          &copy; {currentYear} Auckland University Canoe Club
        </p>
      </div>
    </footer>
  )
}
