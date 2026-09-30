import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NoActiveTiers } from '../_components/errors/NoActiveTiers'
import { SignUpClosed } from '../_components/errors/SignUpClosed'
import { MembershipPricing } from '../_components/pricing/MembershipPricing'
import { SignUpLink } from '../_components/signup/SignUpLink'

describe('membership components', () => {
  it('renders a friendly empty state when no tiers are active', () => {
    render(<MembershipPricing tiers={[]} />)

    expect(
      screen.getByRole('heading', {
        name: 'There are no membership tiers available right now.',
      }),
    ).toBeInTheDocument()
  })

  it('renders both membership tiers without hover movement classes', () => {
    render(
      <MembershipPricing
        tiers={[
          { name: 'UoA/AUT students', price: 40 },
          { name: 'General', price: 60 },
        ]}
      />,
    )

    expect(screen.getByText('UoA/AUT students')).toBeInTheDocument()
    expect(screen.getByText('$40')).toBeInTheDocument()
    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('$60')).toBeInTheDocument()
    expect(screen.getByText('$40').parentElement?.className).not.toContain(
      'hover:scale',
    )
  })

  it('announces closed signups with a status message', () => {
    render(<SignUpClosed />)

    expect(screen.getByRole('status')).toHaveTextContent(
      'Signups are closed, sorry!',
    )
  })

  it('renders the signup form as a keyboard-focusable link', () => {
    render(<SignUpLink url="https://example.com/signup" />)

    const link = screen.getByRole('link', { name: 'Sign up!' })
    expect(link).toHaveAttribute('href', 'https://example.com/signup')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders the closed state instead of a link when signup has no URL', () => {
    render(<SignUpLink url="" />)

    expect(
      screen.queryByRole('link', { name: 'Sign up!' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('exposes the no-tier component as a centered text state', () => {
    render(<NoActiveTiers />)

    expect(screen.getByRole('heading')).toHaveTextContent(
      'There are no membership tiers available right now.',
    )
    expect(screen.getByRole('heading').parentElement?.className).toContain(
      'text-center',
    )
  })
})
