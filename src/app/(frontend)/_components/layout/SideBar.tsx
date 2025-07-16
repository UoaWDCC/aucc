import { X } from 'lucide-react'

import { cn } from '@/lib/utils/cn'
import { SideBarButton } from './SideBarButton'

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
    name: 'GALLERY',
    href: '/gallery',
  },
  {
    name: 'MERCH',
    href: '/merchandise',
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

export function SideBar({
  currentPath,
  sideBarVisible,
  setSideBarVisible,
}: {
  currentPath: string
  sideBarVisible: boolean
  setSideBarVisible: (value: boolean) => void
}) {
  return (
    <div
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
      <div
        className="group mt-4 mr-4 flex cursor-pointer flex-row md:mt-6 md:mr-6 xl:mt-7"
        onClick={() => {
          setSideBarVisible(false)
        }}
      >
        <div className="font-unbounded mt-2 mr-2 text-end text-sm text-white group-hover:underline">
          CLOSE
        </div>

        <X className="h-8 w-8 font-bold text-white" />
      </div>

      <div className="mt-15 flex w-full flex-col items-end gap-5 pr-4 md:mt-24 md:pr-6 xl:mt-22">
        {PAGES.map((e, index) => (
          <SideBarButton
            key={index}
            href={e.href}
            onClick={() => setSideBarVisible(false)}
            classname={e.href === currentPath ? 'text-algae' : 'text-white'}
          >
            {e.name}
          </SideBarButton>
        ))}
      </div>
    </div>
  )
}
