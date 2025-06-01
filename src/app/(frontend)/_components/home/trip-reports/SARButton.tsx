import Link from 'next/link'

export function SARButton() {
  return (
    <Link href="/trip-reports">
      <button className="text-cream border-cream font-unbounded text-3 border px-2 py-2 text-left">
        SEE ALL
        <br />
        <span className="flex items-center">
          REPORTS
          <svg
            className="ml-8"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.96411 12.1351H18.8634M18.8634 12.1351L11.9138 5.05627M18.8634 12.1351L11.9138 19.2139"
              stroke="#EFEFE1"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </Link>
  )
}
