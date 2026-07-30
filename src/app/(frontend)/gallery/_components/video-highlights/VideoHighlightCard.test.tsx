import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { VideoHighlightCard } from './VideoHighlightCard'

describe('VideoHighlightCard', () => {
  describe('no url prop is provided', () => {
    it('renders grey placeholder', () => {
      const { container } = render(<VideoHighlightCard />)
      const placeholder = container.querySelector('div')
      expect(placeholder).not.toBeNull()
      expect(placeholder?.className).toContain('bg-[#D9D9D9]')
    })
    it('does not render an iframe', () => {
      const { container } = render(<VideoHighlightCard />)

      expect(container.querySelector('iframe')).toBeNull()
    })
  })

  describe('when a valid YouTube URL is passed', () => {
    it('renders an iframe with the YouTube embed url', () => {
      const { container } = render(
        <VideoHighlightCard url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />,
      )

      const iframe = container.querySelector('iframe')
      expect(iframe).not.toBeNull()
      expect(iframe?.getAttribute('src')).toBe(
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
      )
    })

    it('renders an iframe for a youtu.be short URL', () => {
      const { container } = render(
        <VideoHighlightCard url="https://youtu.be/dQw4w9WgXcQ" />,
      )

      const iframe = container.querySelector('iframe')
      expect(iframe).not.toBeNull()
      expect(iframe?.getAttribute('src')).toBe(
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
      )
    })
  })

  describe('when a valid Vimeo URL is passed', () => {
    it('renders an iframe with the Vimeo embed url', () => {
      const { container } = render(
        <VideoHighlightCard url="https://vimeo.com/123456789" />,
      )

      const iframe = container.querySelector('iframe')
      expect(iframe).not.toBeNull()
      expect(iframe?.getAttribute('src')).toBe(
        'https://player.vimeo.com/video/123456789',
      )
    })
  })

  describe('iframe attributes', () => {
    it('has the allowFullScreen attribute', () => {
      const { container } = render(
        <VideoHighlightCard url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />,
      )

      const iframe = container.querySelector('iframe')
      expect(iframe?.hasAttribute('allowfullscreen')).toBe(true)
    })

    it('has a non-empty title attribute', () => {
      const { container } = render(
        <VideoHighlightCard url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />,
      )

      const iframe = container.querySelector('iframe')
      const title = iframe?.getAttribute('title')
      expect(title).toBeTruthy()
      expect(title?.trim().length).toBeGreaterThan(0)
    })
  })

  describe('when the url is an empty string', () => {
    it('does not render an iframe', () => {
      const { container } = render(<VideoHighlightCard url="" />)

      expect(container.querySelector('iframe')).toBeNull()
    })
  })

  describe('when the url is invalid', () => {
    it('does not render an iframe', () => {
      const { container } = render(<VideoHighlightCard url="not a url" />)

      expect(container.querySelector('iframe')).toBeNull()
    })
  })
})
