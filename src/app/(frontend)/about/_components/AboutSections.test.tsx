import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ContactUsSection } from './contact-us/ContactUsSection'
import { ExecsGrid } from './Execs/ExecsGrid'
import { SocialsSection } from './socials/SocialsSection'

vi.mock('@/assets/Logo', () => ({
  Logo: () => <svg data-testid="logo" />,
}))

describe('ContactUsSection', () => {
  it('shows the contact email as a mailto link, with the note', () => {
    render(
      <ContactUsSection
        contactEmail="hello@aucc.example"
        contactNote="Or message us on Facebook."
        address={null}
      />,
    )

    expect(
      screen.getByRole('link', { name: 'hello@aucc.example' }),
    ).toHaveAttribute('href', 'mailto:hello@aucc.example')
    expect(screen.getByText('Or message us on Facebook.')).toBeInTheDocument()
  })

  it('shows only the heading when no details are set', () => {
    render(
      <ContactUsSection
        contactEmail={null}
        contactNote={null}
        address={null}
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'Contact Us' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('link')).toBeNull()
  })
})

describe('SocialsSection', () => {
  it('links each social handle to its profile', () => {
    render(
      <SocialsSection
        socials={[
          {
            id: '1',
            platform: 'instagram',
            handle: 'aucanoeclub',
            url: 'https://www.instagram.com/aucanoeclub/',
          },
          {
            id: '2',
            platform: 'facebook',
            handle: 'AUCanoeClub',
            url: 'https://www.facebook.com/AUCanoeClub',
          },
        ]}
      />,
    )

    expect(screen.getByRole('link', { name: 'aucanoeclub' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/aucanoeclub/',
    )
    expect(screen.getByRole('link', { name: 'AUCanoeClub' })).toHaveAttribute(
      'target',
      '_blank',
    )
  })

  it('renders nothing when there are no socials', () => {
    const { container } = render(<SocialsSection socials={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('ExecsGrid', () => {
  it('shows a message instead of an empty grid', () => {
    render(<ExecsGrid execs={[]} />)
    expect(screen.getByTestId('execs-empty-state')).toHaveTextContent(
      'Our executive team will be listed here soon.',
    )
  })
})
