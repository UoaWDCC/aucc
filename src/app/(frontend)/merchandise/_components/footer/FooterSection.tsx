export function FooterSection() {
  return (
    <footer className="absolute -bottom-0 w-screen bg-[#D3E2DA] px-16 py-10">
      <div className="font-heading float-left flex w-24 text-[24px] text-[#89ACAD]">
        Need Kayaking Gear?
      </div>

      <div className="font-body float-right text-right text-[10px] text-[#1E2A29] italic">
        <p className="text-[18px] font-bold text-[#89ACAD]">
          Check out these retailers:
        </p>
        <ul>
          <li>
            <a
              href="https://canoeandkayak.co.nz/"
              className="text-[11px] underline"
            >
              Canoe & Kayak North Shore
            </a>
          </li>
          <li>
            <a
              href="https://www.furtherfaster.co.nz/"
              className="text-[11px] underline"
            >
              FurtherFasterNZ
            </a>
          </li>
          <li>
            <a href="https://www.nrs.com/" className="text-[11px] underline">
              NRS
            </a>
          </li>
          <li>
            <a
              href="https://paddle-power.nz/"
              className="text-[11px] underline"
            >
              Paddle Power
            </a>
          </li>
          <li>
            <a
              href="https://www.incept.co.nz/"
              className="text-[11px] underline"
            >
              Incept
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
