import { footerLinks } from './MerchandiseFooterData'

export function MerchandiseFooterSection() {
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
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-[11px] underline">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
