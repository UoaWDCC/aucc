import '@testing-library/jest-dom/vitest'

import { vi } from 'vitest'

// next/font loaders only work when Next compiles the code, so give each
// font the site uses a stand-in with the same shape. Add new fonts here.
vi.mock('next/font/google', () => {
  const font = () => ({
    className: 'mock-font',
    style: { fontFamily: 'mock-font' },
  })
  return {
    Caveat: font,
    Caveat_Brush: font,
    Rubik: font,
    Rubik_Mono_One: font,
    Unbounded: font,
  }
})

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly scrollMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe = () => {}
  unobserve = () => {}
  disconnect = () => {}
  takeRecords = () => []
}

global.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver
