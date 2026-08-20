import { footerLinks } from './MerchandiseFooterData'

export function MerchandiseFooterSection() {
  return (
    <footer className="flex w-full flex-wrap items-start justify-between gap-6 bg-[#D3E2DA] px-8 py-10">
      <div className="font-heading w-25 text-[24px] text-[#89ACAD]">
        Need Kayaking Gear?
      </div>

      <div className="font-body text-right text-[10px] text-[#1E2A29] italic">
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
