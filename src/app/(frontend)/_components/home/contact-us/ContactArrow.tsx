function Arrow() {
  return (
    <svg
      width="45"
      height="119"
      viewBox="0 0 55 119"
      className="h-full w-full fill-none"
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

export function ContactArrow() {
  return (
    <div className="absolute top-[25%] left-[48%] z-30 md:top-[19%] md:left-[61%] lg:top-[19%] lg:left-[60%]">
      <div className="relative">
        <div className="h-[45]md:top-[10px] absolute top-[10px] left-[20px] w-[35] scale-x-[-1] rotate-[70deg] md:top-[20px] md:left-[52px] md:rotate-[50deg] lg:top-[15px] lg:left-[82px] lg:h-[130] lg:w-[50] lg:rotate-[60deg]">
          <Arrow />
        </div>
        <div className="font-handwritten text-algae absolute top-[16px] left-[35px] rotate-[22.2deg] text-[20px] whitespace-nowrap md:top-[15px] md:left-[80px] md:rotate-[8deg] md:text-[14px] lg:top-[20px] lg:left-[120px] lg:rotate-[8deg] lg:text-[20px]">
          find us here!
        </div>
      </div>
    </div>
  )
}

