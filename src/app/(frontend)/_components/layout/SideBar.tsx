import { KeyboardEvent, RefObject, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils/cn'
import { SideBarButton } from './SideBarButton'

export const SIDEBAR_ID = 'site-sidebar'

const PAGES: { name: string; href: string }[] = [
  {
    name: 'HOME',
    href: '/',
  },
  {
    name: 'EVENTS',
    href: '/events',
  },
  {
    name: 'RIVERS',
    href: '/rivers',
  },
  {
    name: 'REPORTS',
    href: '/trip-reports',
  },
  {
    name: 'SWIMS',
    href: '/swims',
  },
  {
    name: 'GALLERY',
    href: '/gallery',
  },
  {
    name: 'MERCH',
    href: '/merchandise',
  },
  {
    name: 'MEMBERSHIP',
    href: '/membership',
  },
  {
    name: 'GEAR HIRE',
    href: '/gear-hire',
  },
  {
    name: 'RESOURCES',
    href: '/resources',
  },
  {
    name: 'ABOUT US',
    href: '/about',
  },
]

const FOCUSABLE = 'a[href], button:not([disabled])'

export function SideBar({
  currentPath,
  sideBarVisible,
  setSideBarVisible,
  returnFocusRef,
}: {
  currentPath: string
  sideBarVisible: boolean
  setSideBarVisible: (value: boolean) => void
  /** Element to focus again when the sidebar closes (the menu button). */
  returnFocusRef?: RefObject<HTMLElement | null>
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const wasVisible = useRef(false)

  // Move focus into the sidebar when it opens, and back to the menu button
  // when it closes (but not on the first render).
  useEffect(() => {
    if (sideBarVisible) {
      closeButtonRef.current?.focus()
    } else if (wasVisible.current) {
      returnFocusRef?.current?.focus()
    }
    wasVisible.current = sideBarVisible
  }, [sideBarVisible, returnFocusRef])

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.stopPropagation()
      setSideBarVisible(false)
      return
    }

    // Keep Tab and Shift+Tab inside the sidebar while it is open.
    if (event.key !== 'Tab' || !panelRef.current) return
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      ref={panelRef}
      id={SIDEBAR_ID}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      // While closed, the sidebar is off screen: keep it out of the tab order
      // and away from screen readers.
      inert={!sideBarVisible}
      onKeyDown={handleKeyDown}
      className={cn(
        'fixed z-100 flex h-full w-192 flex-col items-end self-end overflow-hidden transition-transform duration-500 md:w-100',
        sideBarVisible ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      <div className="bg-abyss absolute -z-1 ml-auto h-full w-full md:hidden"></div>
      <div
        className="bg-abyss absolute -z-1 mr-0 ml-auto h-full w-100 justify-self-end"
        style={{
          clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 32% 100%)',
        }}
      />
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close menu"
        className="group mt-4 mr-4 flex cursor-pointer flex-row md:mt-6 md:mr-6 xl:mt-7"
        onClick={() => {
          setSideBarVisible(false)
        }}
      >
        <span
          aria-hidden="true"
          className="font-unbounded mt-2 mr-2 text-end text-sm text-white group-hover:underline"
        >
          CLOSE
        </span>

        <X aria-hidden="true" className="h-8 w-8 font-bold text-white" />
      </button>

      <nav
        aria-label="Site"
        className="mt-15 flex w-full flex-col items-end gap-5 pr-4 md:mt-24 md:pr-6 xl:mt-22"
      >
        {PAGES.map((e) => (
          <SideBarButton
            key={e.href}
            href={e.href}
            onClick={() => setSideBarVisible(false)}
            classname={e.href === currentPath ? 'text-algae' : 'text-white'}
            current={e.href === currentPath}
          >
            {e.name}
          </SideBarButton>
        ))}
      </nav>
    </div>
  )
}
