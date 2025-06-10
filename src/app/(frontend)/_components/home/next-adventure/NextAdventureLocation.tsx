type LocationProps = {
  children: React.ReactNode
}

export function NextAdventureLocation({ children }: LocationProps) {
  return (
    <div className="flex w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="20"
        viewBox="0 0 17 20"
        fill="none"
      >
        <g clipPath="url(#clip0_2240_289)">
          <path
            d="M13.076 9.69097C12.0996 14.6603 6.49549 17.8089 6.49549 17.8089C6.49549 17.8089 2.5654 12.4387 3.54188 7.46931C3.87486 5.77479 4.69644 4.26672 5.82589 3.27684C6.95534 2.28696 8.30014 1.89636 9.56444 2.19097C10.8288 2.48558 11.909 3.44127 12.5676 4.84779C13.2261 6.25431 13.409 7.99646 13.076 9.69097Z"
            stroke="#EFEFE1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.89047 10.7099C8.76807 10.9144 9.66686 10.1266 9.89799 8.95042C10.1291 7.7742 9.60505 6.65491 8.72746 6.45042C7.84986 6.24592 6.95106 7.03365 6.71994 8.20986C6.48881 9.38607 7.01287 10.5054 7.89047 10.7099Z"
            stroke="#EFEFE1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2240_289">
            <rect
              width="13.0528"
              height="17.3636"
              fill="white"
              transform="matrix(0.973908 0.226942 -0.192814 0.981235 3.3479 -6.10352e-05)"
            />
          </clipPath>
        </defs>
      </svg>
      <p className="font-body w-full text-left italic">{children}</p>
    </div>
  )
}
