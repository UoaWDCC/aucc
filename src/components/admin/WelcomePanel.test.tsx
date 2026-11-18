import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WelcomePanel } from './WelcomePanel'

describe('WelcomePanel', () => {
  it('links to the everyday admin tasks', () => {
    render(<WelcomePanel />)

    expect(screen.getByRole('link', { name: /Add an event/ })).toHaveAttribute(
      'href',
      '/admin/collections/events/create',
    )
    expect(
      screen.getByRole('link', { name: /Write a trip report/ }),
    ).toHaveAttribute('href', '/admin/collections/trip-reports/create')
    expect(
      screen.getByRole('link', { name: /Add gallery photos/ }),
    ).toHaveAttribute('href', '/admin/collections/gallery/create')
    expect(screen.getByRole('link', { name: /Review swims/ })).toHaveAttribute(
      'href',
      '/admin/collections/swims',
    )
  })

  it('opens the public website in a new tab', () => {
    render(<WelcomePanel />)

    const link = screen.getByRole('link', { name: 'View the website' })
    expect(link).toHaveAttribute('href', '/')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
