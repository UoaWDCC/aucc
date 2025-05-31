function Arrow() {
  return (
    <svg
      width="55"
      height="119"
      viewBox="0 0 55 119"
      className="fill-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M43 116.507C45.1127 116.507 47.2253 116.507 49.338 116.507C49.9702 116.507 53.4794 117.029 52.8151 116.199C51.8539 114.997 51.7224 112.921 51.2306 111.445C50.9266 110.533 50.8538 107.362 50.1303 107"
        className="stroke-cream stroke-3"
        strokeLinecap="round"
      />
      <path
        d="M26 2C13.3023 9.5 4.5 18 2.00392 30.5C2.00326 36.7922 1.69822 49.1798 6.61158 53.884C18.4758 65.2434 50.6201 54.2452 29.0665 38.3143C19.1198 30.9624 15.5747 39.7572 11.6189 43.5563C4.38914 50.5 2.98354 77.5816 8.8023 86.8231C14.6211 96.0647 22.963 103.371 32.7438 108.261C36.9775 110.378 49.2235 112.428 51.0519 116.085"
        className="stroke-cream stroke-3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AgendaArrow() {
  return (
    <div className="relative mt-[min(92%,515px)] mr-auto ml-auto flex w-full max-w-130 flex-row tracking-tighter">
      <div className="ml-12 rotate-15 md:rotate-0">
        <Arrow />
      </div>
      <div className="font-handwritten text-cream absolute top-20 ml-20 rotate-10 text-[20px]">
        what&apos;s on the agenda?
      </div>
    </div>
  )
}
