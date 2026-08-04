export function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`font-body rounded-full px-4 py-1.5 text-sm tracking-tight transition ${
        active ? 'bg-white text-[#89ACAD]' : 'bg-white/30 text-white'
      }`}
    >
      {label}
    </button>
  )
}
