function Underlines({ className }: { className?: string }) {
  return (
    <svg
      width="231"
      height="16"
      viewBox="0 0 231 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line
        y1="-1.5"
        x2="230.063"
        y2="-1.5"
        transform="matrix(0.999726 0.0233915 -0.018234 0.999834 0 3)"
        stroke="#A3C6C2"
        strokeWidth="3"
      />
      <line
        x1="3.10742"
        y1="14.4999"
        x2="226.064"
        y2="14.5"
        stroke="#A3C6C2"
        strokeWidth="3"
      />
    </svg>
  )
}
export function OurRiversText() {
  return (
    <div>
      <div className="font-heading text-4xl leading-10 text-[#89ACAD] md:text-5xl md:leading-15">
        <div className="justify-self-end pr-31 md:pr-42">Our</div>
        <div>
          <div className="justify-self-end">Rivers</div>
          <Underlines className="w-45 justify-self-end md:w-60" />
        </div>
      </div>
    </div>
  )
}
