/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getSiteSettings } from '@/queries/site-settings'
import { Footer } from './Footer'

vi.mock('@/queries/site-settings', () => ({
  getSiteSettings: vi.fn(),
}))

vi.mock('@/assets/Logo', () => ({
  Logo: () => <svg data-testid="logo" />,
}))

const fullSettings = {
  id: 1,
  contactEmail: 'hello@aucc.example',
  contactNote: null,
  address: 'Level 1, Example St\nAuckland',
  socials: [
    {
      id: 'a',
      platform: 'instagram',
      handle: 'aucanoeclub',
      url: 'https://www.instagram.com/aucanoeclub/',
    },
  ],
  footerLinks: [
    { id: 'b', label: 'Events', href: '/events' },
    { id: 'c', label: 'Club library', href: 'https://drive.example/lib' },
  ],
  defaultShareImage: null,
}

async function renderFooter(settings: unknown) {
  ;(getSiteSettings as any).mockResolvedValue(settings)
  render(await Footer())
}

describe('Footer', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows contact details, links and socials from Site Settings', async () => {
    await renderFooter(fullSettings)

    expect(
      screen.getByRole('link', { name: /hello@aucc\.example/ }),
    ).toHaveAttribute('href', 'mailto:hello@aucc.example')
    expect(screen.getByText(/Level 1, Example St/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Events' })).toHaveAttribute(
      'href',
      '/events',
    )
    expect(screen.getByRole('link', { name: /aucanoeclub/ })).toHaveAttribute(
      'href',
      'https://www.instagram.com/aucanoeclub/',
    )
    expect(
      screen.getByRole('link', { name: /join the club/i }),
    ).toHaveAttribute('href', '/membership')
  })

  it('opens external links in a new tab', async () => {
    await renderFooter(fullSettings)

    const external = screen.getByRole('link', { name: 'Club library' })
    expect(external).toHaveAttribute('target', '_blank')
    expect(external).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByRole('link', { name: 'Events' })).not.toHaveAttribute(
      'target',
    )
  })

  it('hides empty sections but keeps the copyright and join link', async () => {
    await renderFooter({
      ...fullSettings,
      contactEmail: null,
      address: null,
      socials: [],
      footerLinks: [],
    })

    expect(screen.queryByRole('navigation', { name: 'Footer' })).toBeNull()
    expect(screen.queryByText(/follow us/i)).toBeNull()
    expect(screen.queryByRole('link', { name: /@/ })).toBeNull()
    expect(
      screen.getByText(/Auckland University Canoe Club$/),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /join the club/i })).toBeVisible()
  })
})
