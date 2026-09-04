import Image from 'next/image'

export function SwimsHeaderBackground() {
  return (
    <div className="absolute inset-0 size-full overflow-hidden select-none">
      <Image
        src="/images/merch-hero.png"
        alt=""
        fill
        priority
        className="object-cover object-top"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#26342c] from-10% to-[#90A1A5]/0 opacity-80 brightness-90" />
    </div>
  )
}
