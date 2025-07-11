import { cn } from '@/lib/utils/cn'
import { SideButton } from './SideBarButton'

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 31 31"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <path
        d="M25.5 8.75L8.5 26.25M8.5 8.75L25.5 26.25"
        className="stroke-white stroke-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SideBar({
  sideBarVisible,
  setSideBarVisible,
}: {
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
        className="mt-4 mr-4 flex flex-row md:mt-6 md:mr-6 xl:mt-7"
        onClick={() => {
          setSideBarVisible(false)
        }}
      >
        <div className="font-unbounded mt-2 mr-2 text-end text-sm text-white">
          CLOSE
        </div>

        <div className="h-8 w-8">
          <CrossIcon />
        </div>
      </div>

      <div className="mt-15 flex w-full flex-col items-end gap-5 pr-4 md:mt-24 md:pr-6 xl:mt-22">
        <SideButton href="/" setSideBarVisible={setSideBarVisible}>
          HOME
        </SideButton>
        <SideButton href="/events" setSideBarVisible={setSideBarVisible}>
          EVENTS
        </SideButton>
        <SideButton href="/rivers" setSideBarVisible={setSideBarVisible}>
          RIVERS
        </SideButton>
        <SideButton href="/trip-reports" setSideBarVisible={setSideBarVisible}>
          REPORTS
        </SideButton>
        <SideButton href="/gallery" setSideBarVisible={setSideBarVisible}>
          GALLERY
        </SideButton>
        <SideButton href="/merchandise" setSideBarVisible={setSideBarVisible}>
          MERCH
        </SideButton>
        <SideButton href="/gear-hire" setSideBarVisible={setSideBarVisible}>
          GEAR HIRE
        </SideButton>
        <SideButton href="/resources" setSideBarVisible={setSideBarVisible}>
          RESOURCES
        </SideButton>
        <SideButton href="/about" setSideBarVisible={setSideBarVisible}>
          ABOUT US
        </SideButton>
      </div>
    </div>
  )
}
